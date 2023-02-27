import { Module } from '@nestjs/common';
import { RecruitService } from './recruit.service';
import { RecruitController } from './recruit.controller';

@Module({
  providers: [RecruitService],
  controllers: [RecruitController],
})
export class RecruitModule {}
