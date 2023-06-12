import { ErrorMessageKey, ErrorMessageT } from "./";

export const ERROR_MESSAGES: ErrorMessageT = {
  UNKNOWN: {
    code: ErrorMessageKey.UNKNOWN,
    message: "UNKNOWN",
  },
  USER_NOT_FOUND: {
    code: ErrorMessageKey.USER_NOT_FOUND,
    message: "USER_NOT_FOUND",
  },
  USERS_EMPTY: {
    code: ErrorMessageKey.USERS_EMPTY,
    message: "USERS_EMPTY",
  },
  TOKEN_IS_INVALID: {
    code: ErrorMessageKey.TOKEN_IS_INVALID,
    message: "TOKEN_IS_INVALID",
  },
  PERMISSION_DENIED: {
    code: ErrorMessageKey.PERMISSION_DENIED,
    message: "PERMISSION_DENIED",
  },
  TOO_MANY_REQUEST: {
    code: ErrorMessageKey.TOO_MANY_REQUEST,
    message: "TOO_MANY_REQUEST",
  },
  PASSWORD_IS_INVALID: {
    code: ErrorMessageKey.PASSWORD_IS_INVALID,
    message: "PASSWORD_IS_INVALID",
  },
  USER_ALREADY_EXIST: {
    code: ErrorMessageKey.USER_ALREADY_EXIST,
    message: "USER_ALREADY_EXIST",
  },
  OTP_IS_INVALID: {
    code: ErrorMessageKey.OTP_IS_INVALID,
    message: "OTP_IS_INVALID",
  },
  REFRESH_TOKEN_IS_INVALID: {
    code: ErrorMessageKey.REFRESH_TOKEN_IS_INVALID,
    message: "REFRESH_TOKEN_IS_INVALID",
  },
  THIRD_PARTY_HAS_SOME_PROBLEM: {
    code: ErrorMessageKey.THIRD_PARTY_HAS_SOME_PROBLEM,
    message: "THIRD_PARTY_HAS_SOME_PROBLEM",
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
