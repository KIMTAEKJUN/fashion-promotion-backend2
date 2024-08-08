import { Profile, Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('auth.kakao.clientId'),
      clientSecret: configService.get('auth.kakao.clientSecret'),
      callbackURL: configService.get('auth.kakao.callbackURL'),
      scope: ['account_email', 'profile_nickname'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void) {
    try {
      const { _json } = profile;
      const user = {
        kakao: {
          ..._json,
        },
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
