import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    if (!user) {
      return {
        message: 'Пользователь с такими данными не существует',
      };
    }
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUsersByEmail(userDto.email);
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

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUsersByEmail(userDto.email);
    if (!user) {
      return null;
    }
    const passwordEquals = await bcryptjs.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    //TODO password invalid
  }

  private async isUserExist(email: string) {
    const user = await this.userService.getUsersByEmail(email);
    return !!user;
  }

  async googleLogin(req) {
    const { user } = req;
    if (!user) {
      return 'No user from google';
    }

    const { email, first, last } = user;
    const name = `${first} ${last}`;

    const exist = await this.isUserExist(email.toLowerCase());
    if (exist) {
      return this.jwtService.sign({
        email,
        name,
      });
    }
    return {
      email,
      name,
    };
  }
}
