import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validation } from './utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.prod'
          : process.env.NODE_ENV === 'development'
          ? '.env.dev'
          : '.env',
      isGlobal: true,
      validationSchema: validation,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
