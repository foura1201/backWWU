import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
  Body,
  Post,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import ServiceResult from 'src/lib/serviceResult';
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

  @Post('search')
  async searchRecruit(@Body() searchDto, @Req() req, @Res() res: Response) {
    const serviceResult = await this.recruitService.searchRecruit(searchDto);

    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Post('like')
  async likeRecruit(@Body() body, @Req() req, @Res() res: Response) {
    const serviceResult = await this.recruitService.likeRecruit(
      body.recruitId,
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Delete('like')
  async cancleRecruitLike(@Body() body, @Req() req, @Res() res: Response) {
    const serviceResult = await this.recruitService.cancleRecruitLike(
      body.recruitId,
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

  @Put('review')
  async modifyReview(@Body() body, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.recruitService.modifyReview(
      body,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Delete('review')
  async deleteReview(@Body() body, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.recruitService.deleteReview(
      body.reviewId,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Get('review/:id') //이때 id는 businessId
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
