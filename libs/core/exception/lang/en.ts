import { ErrorMessageT } from './';

export const ERROR_MESSAGES: ErrorMessageT = {
  UNKNOWN: {
    code: -1,
    message: 'UNKNOWN',
  },
  USER_NOT_FOUND: {
    code: 1,
    message: 'USER_NOT_FOUND',
  },
  USERS_EMPTY: {
    code: 2,
    message: 'USERS_EMPTY',
  },
  TOKEN_IS_INVALID: {
    code: 3,
    message: 'TOKEN_IS_INVALID',
  },
  PERMISSION_DENIED: {
    code: 4,
    message: 'PERMISSION_DENIED',
  },
  TOO_MANY_REQUEST: {
    code: 5,
    message: 'TOO_MANY_REQUEST',
  },
  PASSWORD_IS_INVALID: {
    code: 6,
    message: 'PASSWORD_IS_INVALID',
  },
};

export default ERROR_MESSAGES;
