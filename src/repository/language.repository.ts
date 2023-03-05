import Language from 'src/entity/language.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Language)
export class LanguageRepository extends Repository<Language> {}
