import { Module } from '@nestjs/common';
import { RecruitService } from './recruit.service';
import { RecruitController } from './recruit.controller';
import { TypeOrmExModule } from 'src/lib/typeorm-ex.module';
import { RecruitRepository } from '../repository/recruit.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([RecruitRepository]),
    AuthModule,
  ],
  providers: [RecruitService],
  controllers: [RecruitController],
})
export class RecruitModule {}
