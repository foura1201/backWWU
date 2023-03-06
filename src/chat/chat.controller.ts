import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
@UseGuards(AuthGuard())
export class ChatController {}
