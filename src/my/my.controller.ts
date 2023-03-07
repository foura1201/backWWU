import {
  Body,
  Controller,
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
