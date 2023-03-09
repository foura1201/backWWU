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

  @Put('language')
  async changeLanguage(
    @Body() preferredLanguage,
    @Req() req,
    @Res() res: Response,
  ) {
    const serviceResult: ServiceResult = await this.myService.changeLanguage(
      preferredLanguage,
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

  @Get('/interested')
  async getInterest(@Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.getMyInterest(
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }
  @Post('ressume')
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
  async getResume(@Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.myService.getResume(
      req.user,
    );
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }
}
