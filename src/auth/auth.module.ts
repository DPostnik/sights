import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, GoogleStrategy, RtStrategy } from './stratiegies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, AtStrategy, RtStrategy],
  imports: [
    UsersModule,
    JwtModule.register({
      // secret: process.env.PRIVATE_KEY || 'SECRET',
      // signOptions: {
      //   expiresIn: '24h',
      // },
    }),
  ],
})
export class AuthModule {}
