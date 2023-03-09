import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/lib/typeorm-ex.module';
import { CountryRepository } from 'src/repository/country.repository';
import { IndustryRepository } from 'src/repository/industry.repository';
import { RecruitRepository } from 'src/repository/recruit.repository';
import { RecruitLikeRepository } from 'src/repository/recruitLike.repository';
import { UserRepository } from 'src/repository/user.repository';
import { MyController } from './my.controller';
import { MyService } from './my.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([RecruitRepository]),
    TypeOrmExModule.forCustomRepository([CountryRepository]),
    TypeOrmExModule.forCustomRepository([IndustryRepository]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    TypeOrmExModule.forCustomRepository([RecruitLikeRepository]),
    AuthModule,
  ],
  controllers: [MyController],
  providers: [MyService],
})
export class MyModule {}
