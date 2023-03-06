import { Controller, Get, Query, Param, Res } from '@nestjs/common';
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
    else return res.status(serviceResult.code).json(serviceResult.message);
  }
  @Get('search')
  async searchRecruit(@Query() query) {
    if (query.nickname !== undefined) {
      const nickname = query.nickname;
    }
    if (query.recruitName !== undefined) {
    }
    if (query.countryId !== undefined) {
    }
    if (query.industryId !== undefined) {
    }
    if (query.isRecruting !== undefined) {
    }
  }
  @Get(':id')
  async getRecruit(@Res() res: Response, @Param('id') id: number) {
    const serviceResult = await this.recruitService.getRecruit(id);

    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }
}
