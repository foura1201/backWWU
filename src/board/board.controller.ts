import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {}
