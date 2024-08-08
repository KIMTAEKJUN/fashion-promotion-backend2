export const Error = {
  USER: {
    NOT_FOUND: {
      code: 404,
      message: '사용자가 존재하지 않습니다.',
    },
    DUPLICATED_EMAIL: {
      code: 409,
      message: '이미 가입된 이메일입니다.',
    },
    DUPLICATED_NAME: {
      code: 409,
      message: '이미 사용중인 이름입니다.',
    },
  },
  JWT: {
    INVALID_TOKEN: {
      code: 401,
      message: '유효하지 않은 토큰입니다.',
    },
    EXPIRED_TOKEN: {
      code: 401,
      message: '만료된 토큰입니다.',
    },
    UNAUTHENTICATED: {
      code: 401,
      message: '인증되지 않은 사용자입니다.',
    },
  },
};
