import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { ErrorMessageKey } from "@root/libs/core/exception/lang";
import { ProfileDTO } from "./common";

export class PaginatedResponse<TData> {
  @ApiProperty()
  status: HttpStatus;

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  @ApiProperty({ isArray: true })
  data: TData[];
}

export class ExceptionDTO {
  @ApiProperty()
  code: ErrorMessageKey;

  @ApiProperty()
  message: string;
}
export class ExceptionResponse {
  @ApiProperty()
  status: HttpStatus;

  @ApiProperty()
  path: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty({ type: ExceptionDTO })
  error: ExceptionDTO;
}

export class LoginDataDTO {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
export class LoginResponse {
  @ApiProperty()
  statusCode: HttpStatus;

  @ApiProperty({ type: LoginDataDTO })
  data: LoginDataDTO;
}

export class RefreshTokenResponse {
  @ApiProperty()
  statusCode: HttpStatus;

  @ApiProperty({ type: LoginDataDTO })
  data: LoginDataDTO;
}

export class UserIndexResponse {
  @ApiProperty()
  status: HttpStatus;
  @ApiProperty()
  data: any[];
}

class SignUpDataDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  phoneNumber: string;
}
export class SignUpResponse {
  @ApiProperty()
  status: HttpStatus;
  @ApiProperty()
  data: SignUpDataDTO;
}

export class SendOTPResponse {
  @ApiProperty()
  status: HttpStatus;
  @ApiProperty()
  data: boolean;
}

class ForgotPasswordDataDTO {
  @ApiProperty()
  phoneNumber: string;
}
export class ForgotPasswordResponse {
  @ApiProperty()
  status: HttpStatus;
  @ApiProperty()
  data: ForgotPasswordDataDTO;
}

export class UserProfileResponse {
  @ApiProperty()
  status: HttpStatus;
  @ApiProperty()
  data: ProfileDTO;
}

export class UserUpdateProfileResponse {
  @ApiProperty()
  status: HttpStatus;
  @ApiProperty()
  data: ProfileDTO;
}
