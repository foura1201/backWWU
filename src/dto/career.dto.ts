import User from 'src/entity/user.entity';

export default class CareerDto {
  careerId?: number;
  person: User;
  careerName: string;
  careerPeriod?: number;
  careerEvidence?: string;
  industryId: number;
}
