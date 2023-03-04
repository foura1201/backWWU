import Country from 'src/entity/country.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Country)
export class CountryRepository extends Repository<Country> {}
