import { Module } from '@nestjs/common';
import { RecruitService } from './recruit.service';
import { RecruitController } from './recruit.controller';
import { TypeOrmExModule } from 'src/lib/typeorm-ex.module';
import { RecruitRepository } from '../repository/recruit.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/repository/user.repository';
import { RecruitLikeRepository } from 'src/repository/recruitLike.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([RecruitRepository]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    TypeOrmExModule.forCustomRepository([RecruitLikeRepository]),

    AuthModule,
  ],
  providers: [RecruitService],
  controllers: [RecruitController],
})
export class RecruitModule {}
