import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { GoogleRequestDto, KakaoRequestDto } from './dtos/auth.dto';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { KakaoAuthGuard } from './guard/kakao-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login/google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(@Req() _req: Request) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req: GoogleRequestDto) {
    return this.authService.validateGoogleUser(req);
  }

  // TODO: 수정 필요
  @Get('login/kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin(@Req() _req: Request) {}

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallback(@Req() req: KakaoRequestDto) {
    return this.authService.validateKakaoUser(req);
  }
}
