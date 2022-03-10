import { PassportStrategy } from '@nestjs/passport';

import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '87635659370-m1s3k1n8j8ua2f47vvhnkbq4t1kv56cn.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      first: name.givenName,
      last: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
