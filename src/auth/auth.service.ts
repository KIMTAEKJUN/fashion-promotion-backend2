import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { GoogleRequestDto } from './dtos/auth-google.dto';
import { KakaoRequestDto } from './dtos/auth-kakao.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(req: GoogleRequestDto) {
    try {
      const user = await this.userRepository.findOne({ where: { email: req.user.email } });
      if (!user) {
        const newUser = this.userRepository.create({
          email: req.user.email,
          userName: req.user.userName,
          profileImage: req.user.profileImage,
          socialId: req.user.socialId,
          socialType: req.user.socialType,
          Role: 'user',
        });
        await this.userRepository.save(newUser);
      }
      return req.user;
    } catch (error) {
      return error;
    }
  }

  // TODO: 수정 필요
  async kakaoLogin(req: KakaoRequestDto) {
    try {
      const user = await this.userRepository.findOne({ where: { email: req.user.email } });
      if (!user) {
        const newUser = this.userRepository.create({
          email: req.user.email,
          userName: req.user.userName,
          profileImage: req.user.profileImage,
          socialId: req.user.socialId,
          socialType: req.user.socialType,
          Role: 'user',
        });
        await this.userRepository.save(newUser);
      }
      return req.user;
    } catch (error) {
      return error;
    }
  }
}
