export const Error = {
  COMMON: {
    BAD_REQUEST: {
      code: 400,
      message: '잘못된 요청입니다.',
    },
    INTERNAL_SERVER_ERROR: {
      code: 500,
      message: '서버에 오류가 발생했습니다.',
    },
  },
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
  AUTH: {
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
    NO_TOKEN: {
      code: 401,
      message: '토큰이 제공되지 않았습니다.',
    },
    OAUTH_FAILED: {
      code: 401,
      message: 'OAuth 인증에 실패했습니다.',
    },
    GENERAL_OAUTH_FAILED: {
      code: 401,
      message: '인증 과정에서 실패가 발생했습니다.',
    },
    OAUTH_PROVIDER_NOT_FOUND: {
      code: 500,
      message: 'OAuth 제공자를 찾을 수 없습니다.',
    },
  },
};
