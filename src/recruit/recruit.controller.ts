import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { RecruitService } from './recruit.service';

@Controller('recruit')
export class RecruitController {
  constructor(private recruitService: RecruitService) {}

  @Get()
  async getAllRecruit(@Res() res: Response) {
    const serviceResult = await this.recruitService.getAllRecruits();
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(200).json(serviceResult.message);
  }
}
