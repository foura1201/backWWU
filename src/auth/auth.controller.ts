import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { registerDecorator } from 'class-validator';
import { Response } from 'express';
import RegisterDto from 'src/dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto, @Res() res: Response) {
    const serviceResult = await this.authService.registerUser(registerDto);
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Post('login')
  async login(@Body() loginDto, @Res() res: Response) {
    const serviceResult = await this.authService.login(loginDto);
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.message);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Post('/test') //토큰 사용하여 인증하기 test
  @UseGuards(AuthGuard())
  authTest(@Req() req) {
    console.log(req);
  }
}
