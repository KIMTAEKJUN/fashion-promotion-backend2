export class GoogleRequestDto {
  user: {
    email: string;
    userName: string;
    profileImage: string;
    socialId: string;
    socialType: string;
    Role: string;
  };
}

export class KakaoRequestDto {
  user: {
    kakao: {
      id: number;
      properties: {
        nickname: string;
        profile_image: string;
      };
      kakao_account: {
        email: string;
      };
      socialType: string;
      accessToken: string;
      refreshToken: string;
    };
  };
}
