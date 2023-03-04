import { Injectable } from '@nestjs/common';
import ServiceResult from 'src/lib/serviceResult';
import { RecruitRepository } from './recruit.repository';

@Injectable()
export class RecruitService {
  constructor(private recruitRepository: RecruitRepository) {}
  recruitList = [];

  /*async getAllRecruits(): Promise<Recruit[]> {
    console.log(1);
    return this.recruitRepository.find();
    //console.log(2);
  }*/

  async getAllRecruits(): Promise<ServiceResult> {
    const recruitList = await this.recruitRepository.find();

    if (recruitList.length === 0) {
      const serviceResultData: ServiceResult = {
        code: 400,
        message: 'Bad Request',
      };
      return serviceResultData;
    } else {
      const serviceResultData: ServiceResult = {
        code: 200,
        message: 'success!',
        data: recruitList,
      };
      return serviceResultData;
    }
  }
}
