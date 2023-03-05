import PostLike from 'src/entity/postLike.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(PostLike)
export class PostLikeRepository extends Repository<PostLike> {}
