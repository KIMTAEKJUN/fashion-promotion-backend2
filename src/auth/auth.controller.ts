import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GoogleRequestDto } from './dtos/auth-google.dto';
import { KakaoRequestDto } from './dtos/auth-kakao.dto';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { KakaoAuthGuard } from './guard/kakao-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('login/google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(@Req() _req: Request) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req: GoogleRequestDto) {
    return this.authService.googleLogin(req);
  }

  // TODO: 수정 필요
  @Get('login/kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin(@Req() _req: Request) {}

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallback(@Req() req: KakaoRequestDto) {
    return this.authService.kakaoLogin(req);
  }
}
