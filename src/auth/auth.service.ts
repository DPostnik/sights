import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { UsersService } from '../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { User } from '../modules/users/users.model';
import { Credentials, GmailDataModel, Tokens } from '../interfaces/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: CreateUserDto): Promise<Tokens> {
    const hash = this.hashData(dto.password);
    const newUser = await this.userService.create({ ...dto, password: hash });
    const tokens = await this.getToken(newUser);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(credentials: Credentials): Promise<Tokens> {
    const user = await this.userService.getUserByEmail(credentials.email);
    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcryptjs.compare(
      credentials.password,
      user.password,
    );
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getToken(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    await this.userService.clearRefreshToken(userId);
  }

  async refreshTokens(email: string, rt: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!(user || user.refreshToken))
      throw new ForbiddenException('Access Denied');

    const rtMatches = await bcryptjs.compare(rt, user.refreshToken);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getToken(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  hashData(data: string) {
    return bcryptjs.hash(data, 5);
  }

  private async getToken(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: 5 * 60,
        secret: 'at-secret',
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 60 * 7,
        secret: 'rt-secret',
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  private async updateRefreshToken(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.userService.updateUserRefreshToken(userId, hash);
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

  // async login(userDto: CreateUserDto): Promise<TokenModel | string> {
  //   const { message, user } = await this.validateUser(userDto);
  //   if (message) {
  //     return message;
  //   }
  //   return this.generateToken(user);
  // }
  //
  // async registration(userDto: CreateUserDto): Promise<TokenModel> {
  //   const candidate = this.isUserExist(userDto.email);
  //   if (candidate) {
  //     throw new HttpException(
  //       'Пользователь с таким email существует',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   const hashPassword = await bcryptjs.hash(userDto.password, 5);
  //   const user = await this.userService.create({
  //     ...userDto,
  //     password: hashPassword,
  //   });
  //   return this.generateToken(user);
  // }
  //
  // private async generateToken(user: User): Promise<TokenModel> {
  //   const payload = { email: user.email, id: user.id, name: user.name };
  //   return {
  //     token: this.jwtService.sign(payload),
  //   };
  // }

  // private async validateUser(
  //   userDto: CreateUserDto,
  // ): Promise<UserAuthDataModel> {
  //   const user = await this.userService.getUserByEmail(userDto.email);
  //   if (!user) {
  //     return {
  //       message: 'Пользователь с такими данными не существует',
  //       user: null,
  //     };
  //   }
  //   const passwordEquals = await bcryptjs.compare(
  //     userDto.password,
  //     user.password,
  //   );
  //   if (passwordEquals) {
  //     return { message: null, user };
  //   }
  //   return { message: 'Неправильный пароль', user: null };
  // }
  //
  // private async isUserExist(email: string): Promise<boolean> {
  //   const user = await this.userService.getUserByEmail(email);
  //   return !!user;
  // }
}
