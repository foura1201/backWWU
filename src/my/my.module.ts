import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/lib/typeorm-ex.module';
import { UserRepository } from 'src/repository/user.repository';
import { MyController } from './my.controller';
import { MyService } from './my.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository]), AuthModule],
  controllers: [MyController],
  providers: [MyService],
})
export class MyModule {}
