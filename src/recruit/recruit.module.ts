import { Module } from '@nestjs/common';
import { RecruitService } from './recruit.service';
import { RecruitController } from './recruit.controller';
import { TypeOrmExModule } from 'src/repository/typeorm-ex.module';
import { RecruitRepository } from './recruit.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([RecruitRepository])],
  providers: [RecruitService],
  controllers: [RecruitController],
})
export class RecruitModule {}
