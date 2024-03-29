import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/lib/typeorm-ex.module';
import { CareerRepository } from 'src/repository/carrer.repository';
import { CommentRepository } from 'src/repository/comment.repository';
import { CountryRepository } from 'src/repository/country.repository';
import { IndustryRepository } from 'src/repository/industry.repository';
import { LanguageRepository } from 'src/repository/language.repository';
import { PostLikeRepository } from 'src/repository/postLike.repository';
import { RecruitRepository } from 'src/repository/recruit.repository';
import { RecruitLikeRepository } from 'src/repository/recruitLike.repository';
import { ResumeRepository } from 'src/repository/resume.repository';
import { ReviewRepository } from 'src/repository/review.repository';
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
    TypeOrmExModule.forCustomRepository([ResumeRepository]),
    TypeOrmExModule.forCustomRepository([CareerRepository]),
    TypeOrmExModule.forCustomRepository([LanguageRepository]),
    TypeOrmExModule.forCustomRepository([ReviewRepository]),
    TypeOrmExModule.forCustomRepository([PostLikeRepository]),
    TypeOrmExModule.forCustomRepository([CommentRepository]),

    AuthModule,
  ],
  controllers: [MyController],
  providers: [MyService],
})
export class MyModule {}
