import Post from 'src/entity/post.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Post)
export class PostRepository extends Repository<Post> {}
