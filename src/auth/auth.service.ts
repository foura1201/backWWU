import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import RegisterDto from 'src/dto/register.dto';
import ServiceResult from 'src/lib/serviceResult';
import { UserRepository } from 'src/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/lib/enumeration/enum';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  public async registerUser(user: RegisterDto): Promise<ServiceResult> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    try {
      const userExist = await this.userRepository.findBy({
        username: user.username,
      });

      if (userExist.length) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: 'username is already exists',
        };
        return serviceResult;
      }

      const myUserType =
        user.userType === 'person' ? UserType.person : UserType.business;

      const createdUser = await this.userRepository.create({
        username: user.username,
        password: hashedPassword,
        preferredLanguage: user.preferredLanguage,
        userType: myUserType,
      });

      await this.userRepository.insert(createdUser);
      createdUser.password = undefined;

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'success!',
        data: [createdUser],
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
