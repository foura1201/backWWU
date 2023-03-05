import RecruitLike from 'src/entity/recruitLike.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(RecruitLike)
export class RecruitLikeRepository extends Repository<RecruitLike> {}
