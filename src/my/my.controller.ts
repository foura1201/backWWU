import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('my')
@UseGuards(AuthGuard())
export class MyController {}
