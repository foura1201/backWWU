import { Recruit } from 'src/entity/recruit.entity';
import { CustomRepository } from 'src/repository/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Recruit)
export class RecruitRepository extends Repository<Recruit> {}
