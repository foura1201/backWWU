import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return (
      process.env.DB_USERNAME +
      ' ' +
      process.env.DB_PASSWORD +
      ' ' +
      process.env.DB_PORT +
      ' ' +
      process.env.DB_DATABASE
    );
  }
}
