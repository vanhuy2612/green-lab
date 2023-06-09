import { ErrorMessageT } from './';

export const ERROR_MESSAGES: ErrorMessageT = {
  UNKNOWN: {
    code: -1,
    message: 'Lỗi không xác định',
  },
  USER_NOT_FOUND: {
    code: 1,
    message: 'Không tìm thấy user',
  },
  USERS_EMPTY: {
    code: 2,
    message: 'Dữ liệu rỗng',
  },
  TOKEN_IS_INVALID: {
    code: 3,
    message: 'Token không hợp lệ',
  },
  PERMISSION_DENIED: {
    code: 4,
    message: 'Không có quyền truy cập',
  },
  TOO_MANY_REQUEST: {
    code: 5,
    message: 'Quá nhiều yêu cầu truy cập',
  },
  PASSWORD_IS_INVALID: {
    code: 6,
    message: 'Password không hợp lệ',
  },
};

export default ERROR_MESSAGES;
