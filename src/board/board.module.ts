import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/lib/typeorm-ex.module';
import { RecruitRepository } from 'src/repository/recruit.repository';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([RecruitRepository]),
    AuthModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
