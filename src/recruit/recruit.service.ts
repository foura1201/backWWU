import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import User from 'src/entity/user.entity';
import ServiceResult from 'src/lib/serviceResult';
import { ReviewRepository } from 'src/repository/review.repository';
import { RecruitLikeRepository } from 'src/repository/recruitLike.repository';
import { RecruitRepository } from '../repository/recruit.repository';
import RecruitLike from 'src/entity/recruitLike.entity';
import { DataSource } from 'typeorm';
import { dataSource } from 'src/lib/dataSourse';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class RecruitService {
  constructor(
    private recruitRepository: RecruitRepository,
    private userRepository: UserRepository,
    private recruitLikeRepository: RecruitLikeRepository,
  ) {}

  async getAllRecruits(): Promise<ServiceResult> {
    try {
      const recruitList = await this.recruitRepository.find();

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'success!',
        data: recruitList,
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchNickname(nickname: string): Promise<object[]> {
    try {
      const arr = await this.recruitRepository.findByNickname(nickname);
      console.log(arr);
      return arr;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchRecruitName(recruitName: string): Promise<object[]> {
    try {
      const arr = await this.recruitRepository.findByRecruitName(recruitName);
      console.log('흥');
      return arr;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async likeRecruit(id: number, uid: number): Promise<ServiceResult> {
    try {
      const user = uid;
      const recruit = id;
      const like = new RecruitLike();

      const likeExist = await this.recruitLikeRepository
        .createQueryBuilder('recruitLike')
        .leftJoinAndSelect('recruitLike.person', 'user')
        .leftJoinAndSelect('recruitLike.recruit', 'recruit')
        .where('recruitLike.person = :id', { id: user })
        .andWhere('recruitLike.recruit = :id', { id: recruit })
        .getMany();

      if (likeExist.length) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: 'like is already exists',
        };
        return serviceResult;
      }

      like.person = await this.userRepository.findOne({
        where: { id: user },
      });
      like.recruit = await this.recruitRepository.findOne({
        where: { id: recruit },
      });

      await this.recruitLikeRepository.insert(like);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'success!',
        data: [like],
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생하였습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async cancleRecruitLike(id: number, uid: number): Promise<ServiceResult> {
    try {
      const user = uid;
      const recruit = id;
      const deleteId = await this.recruitLikeRepository
        .createQueryBuilder('recruitLike')
        .leftJoinAndSelect('recruitLike.person', 'user')
        .leftJoinAndSelect('recruitLike.recruit', 'recruit')
        .where('recruitLike.person = :id', { id: user })
        .andWhere('recruitLike.recruit = :id', { id: recruit })
        .getOne();
      await this.recruitLikeRepository.delete(deleteId.id);
      const serviceResult: ServiceResult = {
        code: 200,
        message: 'success!',
        data: [],
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생하였습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRecruit(id: number): Promise<ServiceResult> {
    //리뷰 불러오기 필요
    try {
      const recruit = await this.recruitRepository.findOne({
        where: { id },
        relations: ['business'],
      });
      console.log(recruit);
      const businessId = recruit.business.id;
      /*
      const businessReview = await this.reviewRepository.findOne({
        where: { business: businessId },
      });
      */
      if (recruit === undefined) {
        const serviceResult: ServiceResult = {
          code: 404,
          message: 'Not Found',
        };
        return serviceResult;
      } else {
        const serviceResult: ServiceResult = {
          code: 200,
          message: 'Success!',
          data: [recruit],
        };
        return serviceResult;
      }
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
