import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Comment)
export class CommentRepository extends Repository<Comment> {}
