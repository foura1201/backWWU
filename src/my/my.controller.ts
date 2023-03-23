import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MyService } from './my.service';
import { Response } from 'express';
import ServiceResult from 'src/lib/serviceResult';
import { CareerRepository } from 'src/repository/carrer.repository';

@Controller('my')
@UseGuards(AuthGuard())
export class MyController {
  constructor(private myService: MyService) {}

  @Get()
  async getMyInfo(@Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.getMyInfo(
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Put()
  async modifyMyInfo(@Body() userDto, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.modifyMyInfo(
      userDto,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Put('changeLanguage')
  async changeLanguage(@Body() body, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.changeLanguage(
      body.preferredLanguage,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Get('manage')
  async getManage(@Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.getRecruit(
      req.user,
    );
    res.status(200).json(serviceResult.data);
  }

  @Post('manage')
  async createManage(@Body() manage, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.createRecruit(
      manage,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Put('manage')
  async modifyManage(@Body() manage, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.modifyRecruit(
      manage,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Delete('manage/:id')
  async deleteManage(
    @Param('id') id: number,
    @Req() req,
    @Res() res: Response,
  ) {
    const serviceResult: ServiceResult = await this.myService.deleteRecruit(
      id,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Get('interested')
  async getInterest(@Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.getMyInterest(
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }
  @Post('resume')
  async createResume(@Body() resume, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.createResume(
      resume,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Put('resume')
  async modifyResume(@Body() resume, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.modifyResume(
      resume,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Delete('resume')
  async deleteResume(@Body() body, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.deleteResume(
      body.resumeId,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Get('resume')
  async getAllResumes(@Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.getAllResumes(
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Get('resume/:id')
  async getResume(@Param('id') id: number, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.getResume(
      id,
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Get('reviewed')
  async getReview(@Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.getMyReview(
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Post('career')
  async createCareer(@Body() career, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.createCareer(
      career,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Put('career')
  async modifyCareer(@Body() career, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.modifyCareer(
      career,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Delete('career')
  async deleteCareer(@Body() body, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.deleteCareer(
      body.careerId,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Get('career')
  async getCareer(@Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.getCareer(
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Post('language')
  async createLanguage(@Body() language, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.createLanguage(
      language,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Put('language')
  async modifyLanguage(@Body() language, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.modifyLanguage(
      language,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Delete('language')
  async deleteLanguage(@Body() body, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.deleteLanguage(
      body.languageId,
      req.user,
    );
    return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Get('language')
  async getLanguage(@Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.getLanguage(
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Get('liked')
  async getLikedPost(@Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.getLikedPost(
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }
  @Get('commented')
  async getCommentedPost(@Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.getCommentedPost(
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }
}
