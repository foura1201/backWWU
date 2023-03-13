import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/lib/typeorm-ex.module';
import { PostRepository } from 'src/repository/post.repository';
import { RecruitRepository } from 'src/repository/recruit.repository';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([PostRepository]), AuthModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
