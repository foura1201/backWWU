import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto, @Res() res: Response) {
    const { username, password, passwordCheck, userType, preferredLanguage } =
      registerDto;
    if (
      username === undefined ||
      password === undefined ||
      passwordCheck === undefined ||
      userType === undefined ||
      preferredLanguage == undefined
    )
      return res.status(400).json('request body is wrong');

    const serviceResult = await this.authService.registerUser(registerDto);
    if (serviceResult.code === 200)
      return res.status(200).json(serviceResult.data);
    else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @Post('login')
  async logIn(@Body() loginDto, @Res() res: Response) {
    const { username, password } = loginDto;
    if (username === undefined || password === undefined)
      return res.status(400).json('request body is wrong');

    const serviceResult = await this.authService.login(loginDto);
    if (serviceResult.code === 200) {
      res.setHeader('Authorization', 'Bearer ' + serviceResult.message);
      res.cookie('jwt', serviceResult.message, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, //1 hour
      });
      return res.status(200).json(serviceResult.message);
    } else return res.status(serviceResult.code).json(serviceResult.message);
  }

  @UseGuards(AuthGuard())
  @Post('logout')
  async logOut(@Req() req, @Res() res: Response) {
    res.cookie('jwt', '', {
      maxAge: 0,
    });
    return res.sendStatus(200);
  }
}
