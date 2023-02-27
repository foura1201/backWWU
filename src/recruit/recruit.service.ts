import { Injectable } from '@nestjs/common';
import { Recruit } from 'src/entity/recruit.entity';
import { recruitRepository } from 'src/repository/recruit.repository';

@Injectable()
export class RecruitService {
  recruitList = [];

  async getAllRecruits(): Promise<Recruit[]> {
    console.log(1);
    const recruitList = await recruitRepository.findBy({ id: 1 });
    console.log(2);
    console.log(recruitList);
    return recruitList;
  }
}
