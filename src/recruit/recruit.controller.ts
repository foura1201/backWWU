import {
  Controller,
  Get,
  Query,
  Param,
  Res,
  UseGuards,
  Body,
  Post,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RecruitService } from './recruit.service';

@Controller('recruit')
@UseGuards(AuthGuard())
export class RecruitController {
  constructor(private recruitService: RecruitService) {}

  @Get()
  async getAllRecruit(@Res() res: Response) {
    const serviceResult = await this.recruitService.getAllRecruits();
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  ///구현 덜함.
  @Get('search')
  async searchRecruit(@Query() query) {
    let arr1, arr2, arr3, arr4, arr5;
    if (query.nickname !== undefined) {
      arr1 = await this.recruitService.searchNickname(query.nickname);
    }
    if (query.recruitName !== undefined) {
      arr2 = await this.recruitService.searchRecruitName(query.recruitName);
    }
    if (query.countryId !== undefined) {
    }
    if (query.industryId !== undefined) {
    }
  }

  @Post('like')
  async likeRecruit(@Body() body, @Req() req, @Res() res: Response) {
    const serviceResult = await this.recruitService.likeRecruit(
      body.id,
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Delete('like')
  async cancleRecruitLike(@Body() body, @Req() req, @Res() res: Response) {
    const serviceResult = await this.recruitService.cancleRecruitLike(
      body.id,
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Post('review')
  async createReview(@Body() body, @Req() req, @Res() res: Response) {
    const serviceResult = await this.recruitService.createReview(
      body,
      req.user,
    );

    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Get('review/:id')
  async getReview(@Res() res: Response, @Param('id') id: number) {
    const serviceResult = await this.recruitService.getReview(id);

    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Get(':id')
  async getRecruit(@Res() res: Response, @Param('id') id: number) {
    const serviceResult = await this.recruitService.getRecruit(id);

    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }
}
