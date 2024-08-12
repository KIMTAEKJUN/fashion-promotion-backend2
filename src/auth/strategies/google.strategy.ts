import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('auth.google.clientId'),
      clientSecret: configService.get('auth.google.clientSecret'),
      callbackURL: configService.get('auth.google.callbackURL'),
      scope: ['email', 'profile'],
    });
  }

  // refreshToken를 얻기 위한 코드
  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'select_account',
    };
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    try {
      const { emails, id, photos, displayName } = profile;
      const user = {
        email: emails[0].value,
        userName: displayName,
        profileImage: photos[0].value,
        socialId: id,
        socialType: 'GOOGLE',
        accessToken,
        refreshToken,
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
