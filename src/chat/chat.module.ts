import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/lib/typeorm-ex.module';
import { RecruitRepository } from 'src/repository/recruit.repository';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([RecruitRepository]),
    AuthModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
