import Career from 'src/entity/career.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Career)
export class CareerRepository extends Repository<Career> {}
