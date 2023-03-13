import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import ServiceResult from 'src/lib/serviceResult';
import { BoardService } from './board.service';
import { Delete } from '@nestjs/common/decorators';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('work')
  async getAllPost(@Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.boardService.getAllPost();
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Get('work/:id')
  async getPost(@Param('id') id: number, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.boardService.getPost(id);
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Put('view/:id')
  async increaseView(@Param('id') id: number, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.boardService.increaseView(
      id,
    );
    res.status(serviceResult.code).json(serviceResult.message);
  }

  @Post('work')
  async createPost(@Body() body, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.boardService.createPost(
      body,
      req.user,
    );
    return res.status(200).json(serviceResult.message);
  }

  @Put('work/:id')
  async modifyPost(
    @Param('id') id: number,
    @Body() body,
    @Req() req,
    @Res() res: Response,
  ) {
    const serviceResult: ServiceResult = await this.boardService.modifyPost(
      id,
      body,
      req.user,
    );
    return res.status(200).json(serviceResult.message);
  }

  @Delete('work/:id')
  async deletePost(@Param('id') id: number, @Req() req, @Res() res: Response) {
    const serviceResult: ServiceResult = await this.boardService.deletePost(
      id,
      req.user,
    );
    return res.status(200).json(serviceResult.message);
  }
}
