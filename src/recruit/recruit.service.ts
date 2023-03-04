import { Injectable } from '@nestjs/common';
import ServiceResult from 'src/lib/serviceResult';
import { RecruitRepository } from './recruit.repository';

@Injectable()
export class RecruitService {
  constructor(private recruitRepository: RecruitRepository) {}

  async getAllRecruits(): Promise<ServiceResult> {
    const recruitList = await this.recruitRepository.find();

    const serviceResult: ServiceResult = {
      code: 200,
      message: 'success!',
      data: recruitList,
    };
    return serviceResult;
  }

  async getRecruit(recruitId: number): Promise<ServiceResult> {
    const recruit = await this.recruitRepository.findBy({ id: recruitId });

    if (recruit.length === 0) {
      const serviceResult: ServiceResult = {
        code: 404,
        message: 'Not Found',
      };
      return serviceResult;
    } else {
      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
        data: recruit,
      };
      return serviceResult;
    }
  }
}
