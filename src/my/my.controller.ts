import {
  Body,
  Controller,
  Get,
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
}
