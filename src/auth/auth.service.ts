import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import RegisterDto from 'src/dto/register.dto';
import ServiceResult from 'src/lib/serviceResult';
import { UserRepository } from 'src/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/lib/enumeration/enum';
import LoginDto from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  public async registerUser(user: RegisterDto): Promise<ServiceResult> {
    if (user.password !== user.passwordCheck) {
      throw new HttpException(
        '비밀번호가 틀립니다',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  async login(loginDto: LoginDto): Promise<ServiceResult> {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      //유저 토큰 생성 (Secret + Payload)
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);

      const serviceResult: ServiceResult = {
        code: 200,
        message: accessToken,
        data: [user],
      };
      return serviceResult;
    } else {
      throw new UnauthorizedException('logIn failed');
    }
  }
}
