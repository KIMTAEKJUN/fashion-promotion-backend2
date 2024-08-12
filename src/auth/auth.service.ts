import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/users.entity';
import { Repository } from 'typeorm';
import { GoogleRequestDto, KakaoRequestDto } from './dtos/auth.dto';
import { Error } from 'src/exception/error';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateGoogleUser(req: GoogleRequestDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { socialId: String(req.user.socialId) } });

      const existingUserWithEmail = await this.userRepository.findOne({ where: { email: req.user.email } });
      if (existingUserWithEmail) {
        throw new ConflictException(Error.USER.DUPLICATED_EMAIL);
      }

      // 사용자가 없으면 새로운 사용자를 생성하고, 토큰을 발급
      if (!user) {
        const newUser = this.userRepository.create({
          email: req.user.email,
          userName: req.user.userName,
          profileImage: req.user.profileImage,
          socialId: req.user.socialId,
          socialType: req.user.socialType,
          Role: 'USER',
        });
        await this.userRepository.save(newUser);
      }
      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new UnauthorizedException(Error.AUTH.OAUTH_FAILED);
    }
  }

  async googleLogin(req: GoogleRequestDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.validateGoogleUser(req);

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  async validateKakaoUser(req: KakaoRequestDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { socialId: String(req.user.kakao.id) } });

      const existingUserWithEmail = await this.userRepository.findOne({ where: { email: req.user.kakao.kakao_account.email } });
      if (existingUserWithEmail) {
        throw new ConflictException(Error.USER.DUPLICATED_EMAIL);
      }

      // 사용자가 없으면 새로운 사용자를 생성하고, 토큰을 발급
      if (!user) {
        const newUser = this.userRepository.create({
          email: req.user.kakao.kakao_account.email,
          userName: req.user.kakao.properties.nickname,
          profileImage: req.user.kakao.properties.profile_image,
          socialId: String(req.user.kakao.id),
          socialType: req.user.kakao.socialType,
          Role: 'USER',
        });
        await this.userRepository.save(newUser);
      }
      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new UnauthorizedException(Error.AUTH.OAUTH_FAILED);
    }
  }

  async kakaoLogin(req: KakaoRequestDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.validateKakaoUser(req);

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  generateAccessToken(user: User): string {
    const payload = { id: user.id, email: user.email, Role: user.Role };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  generateRefreshToken(user: User): string {
    const payload = { id: user.id, email: user.email, Role: user.Role };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  validateToken(token: string): any {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(Error.AUTH.EXPIRED_TOKEN);
      }
      throw new UnauthorizedException(Error.AUTH.INVALID_TOKEN);
    }
  }
}
