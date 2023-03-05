import Chatbot from 'src/entity/chatbot.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Chatbot)
export class ChatbotRepository extends Repository<Chatbot> {}
