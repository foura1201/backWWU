import { UserType } from 'src/lib/enumeration/enum';

export default class RegisterDto {
  username: string;
  password: string;
  userType: string;
  preferredLanguage: string;
}
