import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import Comment from 'src/entity/comment.entity';

@CustomRepository(Comment)
export class CommentRepository extends Repository<Comment> {}
