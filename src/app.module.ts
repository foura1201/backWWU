import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validation } from './lib/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruit } from './entity/recruit.entity';
import { Country } from './entity/country.entity';
import { Industry } from './entity/industry.entity';
import { User } from './entity/user.entity';
import { RecruitModule } from './recruit/recruit.module';

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
      entities: [Recruit, Country, Industry, User],
      synchronize: true,
    }),
    RecruitModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
