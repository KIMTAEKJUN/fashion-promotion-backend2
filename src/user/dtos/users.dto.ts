import { IsOptional, IsString, MaxLength } from 'class-validator';

enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export class UserResponseDto {
  id: number;
  userName: string;
  email: string;
  profileImage: string;
  role: Role;
}

export class UpdateUserNameRequestDto {
  @IsOptional()
  @IsString({ message: '변경할 닉네임을 입력해주세요.' })
  @MaxLength(20, { message: '닉네임은 최대 20자까지 입력 가능합니다.' })
  userName?: string;
}
