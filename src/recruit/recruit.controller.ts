import { Controller, Get } from '@nestjs/common';
import { Recruit } from 'src/entity/recruit.entity';
import { RecruitService } from './recruit.service';

@Controller('recruit')
export class RecruitController {
  constructor(private recruitService: RecruitService) {}

  @Get()
  getAllRecruit(): Promise<Recruit[]> {
    return this.recruitService.getAllRecruits();
  }
}
