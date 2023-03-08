import Career from 'src/entity/career.entity';
import Country from 'src/entity/country.entity';
import Industry from 'src/entity/industry.entity';
import Language from 'src/entity/language.entity';
import Resume from 'src/entity/resume.entity';
import User from 'src/entity/user.entity';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const dataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true, // 배포 시에 false로
  logging: true,
  entities: [
    Resume,
    Country,
    Industry,
    User,
    Career,
    Language,
    `${__dirname}/../entity/*.entity.{js,ts}`,
  ],
  subscribers: [],
  migrations: [],
  namingStrategy: new SnakeNamingStrategy(),
  timezone: '+09:00',
});
