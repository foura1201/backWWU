import Chat from 'src/entity/chat.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Chat)
export class ChatRepository extends Repository<Chat> {}
