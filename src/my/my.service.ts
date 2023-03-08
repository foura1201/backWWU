import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import RecruitDto from 'src/dto/recruit.dto';
import ResumeDto from 'src/dto/resume.dto';
import UserDto from 'src/dto/user.dto';
import Career from 'src/entity/career.entity';
import Country from 'src/entity/country.entity';
import Industry from 'src/entity/industry.entity';
import Language from 'src/entity/language.entity';
import Resume from 'src/entity/resume.entity';
import User from 'src/entity/user.entity';
import { dataSource } from 'src/lib/dataSourse';
import { PayType, UserType } from 'src/lib/enumeration/enum';
import ServiceResult from 'src/lib/serviceResult';
import { CareerRepository } from 'src/repository/carrer.repository';
import { CountryRepository } from 'src/repository/country.repository';
import { IndustryRepository } from 'src/repository/industry.repository';
import { LanguageRepository } from 'src/repository/language.repository';
import { RecruitRepository } from 'src/repository/recruit.repository';
import { ResumeRepository } from 'src/repository/resume.repository';
import { UserRepository } from 'src/repository/user.repository';
import { In } from 'typeorm';

@Injectable()
export class MyService {
  constructor(
    private userRepository: UserRepository,
    private recruitRepository: RecruitRepository,
    private resumeRepository: ResumeRepository,
    private careerRepository: CareerRepository,
    private languageRepository: LanguageRepository,
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

  async getMyInfo(user: User): Promise<ServiceResult> {
    try {
      const myInfo = await this.userRepository.findOne({
        relations: { country: true, industry: true },
        where: { id: user.id },
      });

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
        data: [myInfo],
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async modifyMyInfo(userDto: UserDto, user: User): Promise<ServiceResult> {
    try {
      const myNewInfo = await this.userRepository.create({
        id: user.id,
        preferredLanguage: userDto.preferredLanguage,
        name: userDto.name,
        nickname: userDto.nickname,
        phoneNumber: userDto.phoneNumber,
        country: userDto.country,
        age: userDto.age,
        location: userDto.location,
        industry: userDto.industry,
        profile: userDto.profile,
      });

      await this.userRepository.update({ id: myNewInfo.id }, myNewInfo);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async changeLanguage(language: string, user: User): Promise<ServiceResult> {
    try {
      const myInfo = await this.userRepository.create({
        id: user.id,
        preferredLanguage: language,
      });
      await this.userRepository.update({ id: myInfo.id }, myInfo);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createResume(resumeDto: ResumeDto, user: User): Promise<ServiceResult> {
    try {
      if (user.userType !== UserType.person) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: '권한이 없습니다',
        };
        return serviceResult;
      }
      const industries: Industry[] = await this.industryRepository
        .createQueryBuilder()
        .where('id In (:id)', { id: resumeDto.desiredIndustry })
        .getMany();

      const countries: Country[] = await this.countryRepository
        .createQueryBuilder()
        .where('id In (:id)', { id: resumeDto.desiredCountry })
        .getMany();

      const careers: Career[] = await this.careerRepository
        .createQueryBuilder('career')
        .leftJoinAndSelect('career.person', 'user')
        .where('career.id In (:id)', { id: resumeDto.career })
        .andWhere('career.person = :a', { a: user.id })
        .getMany();

      const languages: Language[] = await this.languageRepository
        .createQueryBuilder('language')
        .leftJoinAndSelect('language.person', 'user')
        .where('language.id In (:id)', { id: resumeDto.language })
        .andWhere('language.person = :a', { a: user.id })
        .getMany();

      const newResume = await new Resume();
      newResume.person = user;
      newResume.catchPhrase = resumeDto.catchphrase;
      newResume.introduction = resumeDto.introduction;
      newResume.desiredIndustry = industries;
      newResume.desiredCountry = countries;
      newResume.desiredLocation = resumeDto.desiredLocation;
      newResume.desiredPay = resumeDto.desiredPay;
      newResume.public = resumeDto.public;
      newResume.career = careers;
      newResume.language = languages;

      await this.resumeRepository.manager.save(newResume);
      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async modifyResume(resumeDto: ResumeDto, user: User): Promise<ServiceResult> {
    try {
      const myResume = await this.resumeRepository.findOne({
        relations: { person: true },
        where: { id: resumeDto.resumeId },
      });
      if (!myResume) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: '존재하지 않는 recruitId입니다.',
        };
        return serviceResult;
      }
      if (user.userType !== UserType.person || myResume.person.id !== user.id) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: '권한이 없습니다',
        };
        return serviceResult;
      }
      const industries: Industry[] = await this.industryRepository
        .createQueryBuilder()
        .where('id In (:id)', { id: resumeDto.desiredIndustry })
        .getMany();

      const countries: Country[] = await this.countryRepository
        .createQueryBuilder()
        .where('id In (:id)', { id: resumeDto.desiredCountry })
        .getMany();

      const careers: Career[] = await this.careerRepository
        .createQueryBuilder('career')
        .leftJoinAndSelect('career.person', 'user')
        .where('career.id In (:id)', { id: resumeDto.career })
        .andWhere('career.person = :a', { a: user.id })
        .getMany();

      const languages: Language[] = await this.languageRepository
        .createQueryBuilder('language')
        .leftJoinAndSelect('language.person', 'user')
        .where('language.id In (:id)', { id: resumeDto.language })
        .andWhere('language.person = :a', { a: user.id })
        .getMany();

      const newResume = await new Resume();
      newResume.id = resumeDto.resumeId;
      newResume.person = user;
      newResume.catchPhrase = resumeDto.catchphrase;
      newResume.introduction = resumeDto.introduction;
      newResume.desiredIndustry = industries;
      newResume.desiredCountry = countries;
      newResume.desiredLocation = resumeDto.desiredLocation;
      newResume.desiredPay = resumeDto.desiredPay;
      newResume.public = resumeDto.public;
      newResume.career = careers;
      newResume.language = languages;

      await this.resumeRepository.manager.save(newResume);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteResume(resumeId: number, user: User): Promise<ServiceResult> {
    try {
      const myResume = await this.resumeRepository.findOne({
        relations: { person: true },
        where: { id: resumeId },
      });

      if (!myResume) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: '존재하지 않는 recruitId입니다.',
        };
        return serviceResult;
      }
      if (user.userType !== UserType.person || myResume.person.id !== user.id) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: '권한이 없습니다',
        };
        return serviceResult;
      }

      await this.resumeRepository.delete(resumeId);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getResume(user: User): Promise<ServiceResult> {
    try {
      const myResume = await this.resumeRepository
        .createQueryBuilder('resume')
        .leftJoinAndSelect('resume.person', 'user')
        .leftJoinAndSelect('resume.desiredCountry', 'country')
        .leftJoinAndSelect('resume.desiredIndustry', 'industry')
        .leftJoinAndSelect('resume.career', 'career')
        .leftJoinAndSelect('resume.language', 'language')
        .where('resume.person = :a', { a: user.id })
        .getMany();

      console.log(myResume);
      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
        data: [myResume],
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
