import Industry from 'src/entity/industry.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Industry)
export class IndustryRepository extends Repository<Industry> {}
