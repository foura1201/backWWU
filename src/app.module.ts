import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validation } from './lib/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import Recruit from './entity/recruit.entity';
import Country from './entity/country.entity';
import Industry from './entity/industry.entity';
import User from './entity/user.entity';
import { RecruitModule } from './recruit/recruit.module';
import Career from './entity/career.entity';
import Chat from './entity/chat.entity';
import Chatbot from './entity/chatbot.entity';
import CommentReport from './entity/commentReport.entity';
import Language from './entity/language.entity';
import Post from './entity/post.entity';
import PostLike from './entity/postLike.entity';
import PostReport from './entity/postReport.entity';
import RecruitLike from './entity/recruitLike.entity';
import Resume from './entity/resume.entity';
import Review from './entity/review.entity';
import Comment from './entity/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      isGlobal: true,
      validationSchema: validation,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Career,
        Chat,
        Chatbot,
        Comment,
        CommentReport,
        Country,
        Industry,
        Language,
        Post,
        PostLike,
        PostReport,
        Recruit,
        RecruitLike,
        Resume,
        Review,
        User,
      ],
      synchronize: true,
    }),
    RecruitModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
