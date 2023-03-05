import { Module } from '@nestjs/common';
import { RecruitService } from './recruit.service';
import { RecruitController } from './recruit.controller';
import { TypeOrmExModule } from 'src/lib/typeorm-ex.module';
import { RecruitRepository } from '../repository/recruit.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([RecruitRepository])],
  providers: [RecruitService],
  controllers: [RecruitController],
})
export class RecruitModule {}
