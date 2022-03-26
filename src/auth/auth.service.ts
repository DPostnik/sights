import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { User } from '../users/users.model';
import { GmailDataModel, TokenModel, UserAuthDataModel } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto): Promise<TokenModel | string> {
    const { message, user } = await this.validateUser(userDto);
    if (message) {
      return message;
    }
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto): Promise<TokenModel> {
    const candidate = this.isUserExist(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcryptjs.hash(userDto.password, 5);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User): Promise<TokenModel> {
    const payload = { email: user.email, id: user.id, name: user.name };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(
    userDto: CreateUserDto,
  ): Promise<UserAuthDataModel> {
    const user = await this.userService.getUsersByEmail(userDto.email);
    if (!user) {
      return {
        message: 'Пользователь с такими данными не существует',
        user: null,
      };
    }
    const passwordEquals = await bcryptjs.compare(
      userDto.password,
      user.password,
    );
    if (passwordEquals) {
      return { message: null, user };
    }
    return { message: 'Неправильный пароль', user: null };
  }

  private async isUserExist(email: string): Promise<boolean> {
    const user = await this.userService.getUsersByEmail(email);
    return !!user;
  }

  private async isGoogleUserExist(gmail: string): Promise<boolean> {
    const user = await this.userService.getUserByGmail(gmail);
    return !!user;
  }

  async googleLogin(req): Promise<GmailDataModel | string> {
    const { user } = req;
    if (!user) {
      return 'No user from google';
    }

    const { email: gmail } = user;

    const googleUser = {
      gmail,
      name: user.first,
    };

    const exist = await this.isGoogleUserExist(gmail);
    if (exist) {
      return this.jwtService.sign(googleUser);
    }

    return googleUser;
  }
}
