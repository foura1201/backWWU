import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import User from 'src/entity/user.entity';
import ServiceResult from 'src/lib/serviceResult';
import { ReviewRepository } from 'src/repository/review.repository';
import { RecruitLikeRepository } from 'src/repository/recruitLike.repository';
import { RecruitRepository } from '../repository/recruit.repository';
import RecruitLike from 'src/entity/recruitLike.entity';
import { UserRepository } from 'src/repository/user.repository';
import ReviewDto from 'src/dto/review.dto';
import { UserType } from 'src/lib/enumeration/enum';
import SearchDto from 'src/dto/search.dto';

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

  async modifyReview(reviewDto: ReviewDto, user: User): Promise<ServiceResult> {
    try {
      const myReview = await this.reviewRepository.findOne({
        relations: { person: true, business: true },
        where: { id: reviewDto.reviewId },
      });

      if (!myReview) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: '존재하지 않는 reviewId입니다.',
        };
        return serviceResult;
      }

      if (myReview.person.id !== user.id) {
        const serviceResult: ServiceResult = {
          code: 401,
          message: 'Unathorized',
        };
        return serviceResult;
      }

      const newReview = await this.reviewRepository.create({
        id: reviewDto.reviewId,
        rating: reviewDto.rating,
        review: reviewDto.review,
        person: myReview.person,
        business: myReview.business,
      });

      await this.reviewRepository.update({ id: newReview.id }, newReview);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteReview(reviewId: number, user: User): Promise<ServiceResult> {
    try {
      const myReview = await this.reviewRepository.findOne({
        relations: { person: true, business: true },
        where: { id: reviewId },
      });

      if (!myReview) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: '존재하지 않는 reviewId입니다.',
        };
        return serviceResult;
      }

      if (myReview.person.id !== user.id) {
        const serviceResult: ServiceResult = {
          code: 401,
          message: 'Unathorized',
        };
        return serviceResult;
      }

      await this.reviewRepository.delete(reviewId);

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
        relations: { business: true, country: true, industry: true },
      });

      if (recruit === undefined) {
        const serviceResult: ServiceResult = {
          code: 404,
          message: 'Not Found',
        };
        return serviceResult;
      }

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
        data: [recruit], // businessReview],
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchRecruit(searchDto: SearchDto): Promise<ServiceResult> {
    try {
      const nickname =
        searchDto.nickname === undefined ? '' : searchDto.nickname;
      const recruitName =
        searchDto.recruitName === undefined ? '' : searchDto.recruitName;
      const countryIds =
        searchDto.countryIds === undefined ? '' : searchDto.countryIds;
      const industryIds =
        searchDto.industryIds === undefined ? '' : searchDto.industryIds;

      const nicknameOperator = nickname === '' ? '!=' : 'like';
      const recuitNameOperator = recruitName === '' ? '!=' : 'like';
      const countryIdOperator = countryIds === '' ? '!=' : 'in';
      const industryIdOperator = industryIds === '' ? '!=' : 'in';

      const recruits = await this.recruitRepository
        .createQueryBuilder('recruit')
        .leftJoinAndSelect('recruit.business', 'user')
        .leftJoinAndSelect('recruit.country', 'country')
        .leftJoinAndSelect('recruit.industry', 'industry')
        .where(`user.nickname ${nicknameOperator} :nickname`, {
          nickname: `%${nickname}%`,
        })
        .andWhere(`recruitName ${recuitNameOperator} :recruitName`, {
          recruitName: `%${recruitName}%`,
        })
        .andWhere(`country.id ${countryIdOperator} (:countryId)`, {
          countryId: countryIds,
        })
        .andWhere(`industry.id ${industryIdOperator} (:industryId)`, {
          industryId: industryIds,
        })
        .getMany();

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
        data: recruits,
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
