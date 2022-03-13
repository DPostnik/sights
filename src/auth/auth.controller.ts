import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
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
      `${process.env.UI_URL}auth/register?email=${data.email}&name=${data.name}`,
    );
  }
}
