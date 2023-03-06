import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ServiceResult from 'src/lib/serviceResult';
import { RecruitRepository } from '../repository/recruit.repository';

@Injectable()
export class RecruitService {
  reviewRepository: any;
  userRepository: any;
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
      const recruit = await this.recruitRepository.findOne({ where: { id } });
      const businessId = recruit.business;
      /*
      const businessReview = await this.reviewRepository.findOne({
        where: { business: businessId },
      });
      const businessInfo = await this.userRepository.findOne({
        where: { id: businessId },
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
