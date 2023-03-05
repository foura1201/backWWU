import Country from 'src/entity/country.entity';
import Industry from 'src/entity/industry.entity';

export default class userDto {
  id: number;
  username: string;
  password: string;
  userType: string;
  preferredLanguage: string;
  name?: string;
  nickname?: string;
  phoneNumber?: string;
  country?: Country;
  age?: number;
  location?: string;
  industry?: Industry;
  profile?: string;
}
