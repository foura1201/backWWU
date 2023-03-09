export default class RecruitDto {
  id?: number;
  recruitName: string;
  recruitStart: Date;
  recruitEnd: Date;
  countryId?: number;
  location?: string;
  industryId?: number;
  descriptions: string;
  payType: string;
  payAmount: number;
  photos?: string;
  certifications?: string;
}
