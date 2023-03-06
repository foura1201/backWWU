import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import User from 'src/entity/user.entity';
import ServiceResult from 'src/lib/serviceResult';
import { ReviewRepository } from 'src/repository/review.repository';
import { UserRepository } from 'src/repository/user.repository';
import { RecruitRepository } from '../repository/recruit.repository';

@Injectable()
export class RecruitService {
  constructor(private recruitRepository: RecruitRepository) {}

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

  async getRecruit(id: number): Promise<ServiceResult> {
    try {
      const recruit = await this.recruitRepository.findOne({
        where: { id },
        relations: ['business'],
      });
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
