import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/lib/typeorm-ex.module';
import { CommentRepository } from 'src/repository/comment.repository';
import { CommentReportRepository } from 'src/repository/commentReport.repository';
import { PostRepository } from 'src/repository/post.repository';
import { PostLikeRepository } from 'src/repository/postLike.repository';
import { PostReportRepository } from 'src/repository/postReport.repository';
import { RecruitRepository } from 'src/repository/recruit.repository';
import { UserRepository } from 'src/repository/user.repository';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([PostRepository]),
    TypeOrmExModule.forCustomRepository([CommentRepository]),
    TypeOrmExModule.forCustomRepository([PostLikeRepository]),
    TypeOrmExModule.forCustomRepository([PostReportRepository]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    TypeOrmExModule.forCustomRepository([CommentReportRepository]),
    AuthModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
