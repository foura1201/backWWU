import { Injectable } from '@nestjs/common';
import { Recruit } from 'src/entity/recruit.entity';
import { RecruitRepository } from './recruit.repository';

@Injectable()
export class RecruitService {
  constructor(private recruitRepository: RecruitRepository) {}
  recruitList = [];

  async getAllRecruits(): Promise<Recruit[]> {
    console.log(1);
    return this.recruitRepository.find();
    //console.log(2);
  }
}
