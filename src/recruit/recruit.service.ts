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
import ReviewDto from 'src/dto/review.dto';
import { UserType } from 'src/lib/enumeration/enum';

@Injectable()
export class RecruitService {
  constructor(
    private recruitRepository: RecruitRepository,
    private userRepository: UserRepository,
    private recruitLikeRepository: RecruitLikeRepository,
    private reviewRepository: ReviewRepository,
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
      const arr = await this.recruitRepository
        .createQueryBuilder('recruit')
        .leftJoinAndSelect('recruit.business', 'user')
        .where('user.nickname = :a', { a: nickname })
        .getMany();
      return arr;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchRecruitName(recruitName: string): Promise<Object[]> {
    try {
      const arr = await this.recruitRepository
        .createQueryBuilder('recruit')
        .select('recruit.id')
        .where('recruitName = :a', { a: recruitName })
        .getMany();
      return arr;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async likeRecruit(id: number, person: User): Promise<ServiceResult> {
    try {
      const recruit = id;
      const like = new RecruitLike();
      const likeExist = await this.recruitLikeRepository
        .createQueryBuilder('recruitLike')
        .leftJoinAndSelect('recruitLike.person', 'user')
        .leftJoinAndSelect('recruitLike.recruit', 'recruit')
        .where('recruitLike.personId = :a', { a: person.id })
        .andWhere('recruitLike.recruitId = :b', { b: recruit })
        .getMany();
      if (likeExist.length) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: 'like is already exists',
        };
        return serviceResult;
      }

      like.person = await this.userRepository.findOne({
        where: { id: person.id },
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

  async cancleRecruitLike(id: number, person: User): Promise<ServiceResult> {
    try {
      const recruit = id;
      const deleteId = await this.recruitLikeRepository
        .createQueryBuilder('recruitLike')
        .leftJoinAndSelect('recruitLike.person', 'user')
        .leftJoinAndSelect('recruitLike.recruit', 'recruit')
        .where('recruitLike.person = :a', { a: person.id })
        .andWhere('recruitLike.recruit = :b', { b: recruit })
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

  async createReview(reviewDto: ReviewDto, user: User): Promise<ServiceResult> {
    try {
      const business: User = await this.userRepository.findOneBy({
        id: reviewDto.businessId,
      });

      if (
        user.userType !== UserType.person ||
        business.userType !== UserType.business
      ) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: '옳지 않은 접근입니다.',
        };
        return serviceResult;
      }
      const newReview = await this.reviewRepository.create({
        rating: reviewDto.rating,
        review: reviewDto.review,
        business: business,
        person: user,
      });
      await this.reviewRepository.insert(newReview);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
        data: [newReview],
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getReview(id: number): Promise<ServiceResult> {
    try {
      const businessReview = await this.reviewRepository
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.business', 'user')
        .where('review.business = :a', { a: id })
        .getMany();

      if (businessReview === undefined) {
        const serviceResult: ServiceResult = {
          code: 404,
          message: 'Not Found',
        };
        return serviceResult;
      } else {
        const serviceResult: ServiceResult = {
          code: 200,
          message: 'Success!',
          data: [businessReview],
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

  async getRecruit(id: number): Promise<ServiceResult> {
    try {
      const recruit = await this.recruitRepository.findOne({
        where: { id },
        relations: ['business'],
      });
      const businessId = recruit.business.id;

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
          data: [recruit], // businessReview],
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
