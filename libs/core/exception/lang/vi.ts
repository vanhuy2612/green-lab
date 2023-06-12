import { ErrorMessageKey, ErrorMessageT } from "./";

export const ERROR_MESSAGES: ErrorMessageT = {
  UNKNOWN: {
    code: ErrorMessageKey.UNKNOWN,
    message: "Lỗi không xác định",
  },
  USER_NOT_FOUND: {
    code: ErrorMessageKey.USER_NOT_FOUND,
    message: "Không tìm thấy user",
  },
  USERS_EMPTY: {
    code: ErrorMessageKey.USERS_EMPTY,
    message: "Dữ liệu rỗng",
  },
  TOKEN_IS_INVALID: {
    code: ErrorMessageKey.TOKEN_IS_INVALID,
    message: "Token không hợp lệ",
  },
  PERMISSION_DENIED: {
    code: ErrorMessageKey.PERMISSION_DENIED,
    message: "Không có quyền truy cập",
  },
  TOO_MANY_REQUEST: {
    code: ErrorMessageKey.TOO_MANY_REQUEST,
    message: "Quá nhiều yêu cầu truy cập",
  },
  PASSWORD_IS_INVALID: {
    code: ErrorMessageKey.PASSWORD_IS_INVALID,
    message: "Password không hợp lệ",
  },
  USER_ALREADY_EXIST: {
    code: ErrorMessageKey.USER_ALREADY_EXIST,
    message: "User đã tồn tại trong hệ thống",
  },
  OTP_IS_INVALID: {
    code: ErrorMessageKey.OTP_IS_INVALID,
    message: "Mã OTP không hợp lệ",
  },
  REFRESH_TOKEN_IS_INVALID: {
    code: ErrorMessageKey.REFRESH_TOKEN_IS_INVALID,
    message: "Refresh Token không hợp lệ",
  },
  THIRD_PARTY_HAS_SOME_PROBLEM: {
    code: ErrorMessageKey.THIRD_PARTY_HAS_SOME_PROBLEM,
    message: "Dịch vụ bên thứ 3 gặp một số vấn đề",
  },
  BAD_REQUEST: {
    code: ErrorMessageKey.BAD_REQUEST,
    message: "BAD_REQUEST",
  },
  ESMS_RESPONSE_FAIL: {
    code: ErrorMessageKey.ESMS_RESPONSE_FAIL,
    message: "ESMS_RESPONSE_FAIL",
  },
};

export default ERROR_MESSAGES;
