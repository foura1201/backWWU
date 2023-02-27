import { Recruit } from 'src/entity/recruit.entity';
import { dataSource } from 'src/lib/dataSourse';

export const recruitRepository = dataSource.getRepository(Recruit).extend({});
