import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import RecruitDto from 'src/dto/recruit.dto';
import Country from 'src/entity/country.entity';
import Industry from 'src/entity/industry.entity';
import User from 'src/entity/user.entity';
import { PayType, UserType } from 'src/lib/enumeration/enum';
import ServiceResult from 'src/lib/serviceResult';
import { CountryRepository } from 'src/repository/country.repository';
import { IndustryRepository } from 'src/repository/industry.repository';
import { RecruitRepository } from 'src/repository/recruit.repository';

@Injectable()
export class MyService {
  constructor(
    private recruitRepository: RecruitRepository,
    private countryRepository: CountryRepository,
    private industryRepository: IndustryRepository,
  ) {}

  async createRecruit(
    recruitDto: RecruitDto,
    user: User,
  ): Promise<ServiceResult> {
    try {
      if (user.userType !== UserType.business) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: '권한이 없습니다',
        };
        return serviceResult;
      }

      const country: Country = await this.countryRepository.findOneBy({
        id: recruitDto.countryId,
      });

      const industry: Industry = await this.industryRepository.findOneBy({
        id: recruitDto.industryId,
      });

      if (!country || !industry) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: '옳지 않은 countryId 혹은 industryId입니다.',
        };
        return serviceResult;
      }

      const newRecruit = await this.recruitRepository.create({
        recruitName: recruitDto.recruitName,
        recruitStart: recruitDto.recruitStart,
        recruitEnd: recruitDto.recruitEnd,
        country: country,
        industry: industry,
        business: user,
        description: recruitDto.descriptions,
        location: recruitDto.location,
        payType:
          recruitDto.payType === 'hourly' ? PayType.hourly : PayType.monthly,
        payAmount: recruitDto.payAmount,
        photos: recruitDto.photos,
        certifications: recruitDto.certifications,
      });

      await this.recruitRepository.insert(newRecruit);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async modifyRecruit(
    recruitDto: RecruitDto,
    user: User,
  ): Promise<ServiceResult> {
    try {
      const myRecruit = await this.recruitRepository.findOne({
        relations: { business: true },
        where: { id: recruitDto.id },
      });

      if (!myRecruit) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: '존재하지 않는 recruitId입니다.',
        };
        return serviceResult;
      }

      if (myRecruit.business.id !== user.id) {
        const serviceResult: ServiceResult = {
          code: 401,
          message: 'Unathorized',
        };
        return serviceResult;
      }

      const country: Country = await this.countryRepository.findOneBy({
        id: recruitDto.countryId,
      });

      const industry: Industry = await this.industryRepository.findOneBy({
        id: recruitDto.industryId,
      });

      if (!country || !industry) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: '옳지 않은 countryId 혹은 industryId입니다.',
        };
        return serviceResult;
      }

      const newRecruit = await this.recruitRepository.create({
        id: recruitDto.id,
        recruitName: recruitDto.recruitName,
        recruitStart: recruitDto.recruitStart,
        recruitEnd: recruitDto.recruitEnd,
        country: country,
        industry: industry,
        business: user,
        description: recruitDto.descriptions,
        location: recruitDto.location,
        payType:
          recruitDto.payType === 'hourly' ? PayType.hourly : PayType.monthly,
        payAmount: recruitDto.payAmount,
        photos: recruitDto.photos,
        certifications: recruitDto.certifications,
      });

      await this.recruitRepository.update({ id: newRecruit.id }, newRecruit);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
