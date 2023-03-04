import Review from 'src/entity/review.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Review)
export class ReviewRepository extends Repository<Review> {}
