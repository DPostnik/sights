import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Credentials, Tokens } from '../interfaces/interfaces';
import { AtGuard, RtGuard } from './common/guards';
import {
  GetCurrentUser,
  GetCurrentUserEmail,
  Public,
} from './common/decorators';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() credentials: Credentials): Promise<Tokens> {
    return this.authService.signIn(credentials);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser('id') userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserEmail() email: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(email, refreshToken);
  }

  @Get('login')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const data = await this.authService.googleLogin(req);
    if (typeof data === 'string') {
      return res.redirect(`${process.env.UI_URL}home?token=${data}`);
    }
    return res.redirect(
      `${process.env.UI_URL}auth/register?gmail=${data.gmail}&name=${data.name}`,
    );
  }

  // @Post('registration')
  // registration(@Body() userDto: CreateUserDto) {
  //   return this.authService.registration(userDto);
  // }
  //
  // @Post('login')
  // login(@Body() userDto: CreateUserDto) {
  //   return this.authService.login(userDto);
  // }
}
