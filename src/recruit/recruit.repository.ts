import { Recruit } from 'src/entity/recruit.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Recruit)
export class RecruitRepository extends Repository<Recruit> {}
