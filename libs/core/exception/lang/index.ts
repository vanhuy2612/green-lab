export enum ErrorMessageKey {
  UNKNOWN = "UNKNOWN",
  BAD_REQUEST = "BAD_REQUEST",
  TOO_MANY_REQUEST = "TOO_MANY_REQUEST",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USERS_EMPTY = "USERS_EMPTY",
  TOKEN_IS_INVALID = "TOKEN_IS_INVALID",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  PASSWORD_IS_INVALID = "PASSWORD_IS_INVALID",
  USER_ALREADY_EXIST = "USER_ALREADY_EXIST",
  OTP_IS_INVALID = "OTP_IS_INVALID",
  REFRESH_TOKEN_IS_INVALID = "REFRESH_TOKEN_IS_INVALID",
  THIRD_PARTY_HAS_SOME_PROBLEM = "THIRD_PARTY_HAS_SOME_PROBLEM",
  ESMS_RESPONSE_FAIL = "ESMS_RESPONSE_FAIL",
}

export type ErrorMessageT = {
  [key in ErrorMessageKey]: {
    code: ErrorMessageKey;
    message: string;
  };
};
