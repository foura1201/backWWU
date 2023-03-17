import User from 'src/entity/user.entity';

export default class ResumeDto {
  resumeId?: number;
  person: User;
  catchPhrase: string;
  introduction: string;
  desiredIndustry?: number[];
  desiredCountry?: number[];
  desiredLocation?: string;
  desiredPay?: string;
  public: boolean;
  career?: number[];
  language?: number[];
}
