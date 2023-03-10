import User from 'src/entity/user.entity';

export default class LanguageDto {
  languageId?: number;
  person: User;
  language: string;
  level: string;
}
