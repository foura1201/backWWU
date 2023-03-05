import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/lib/typeorm-ex.module';
import { UserRepository } from 'src/repository/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
