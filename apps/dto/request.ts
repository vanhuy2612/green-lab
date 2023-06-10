import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Matches, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';
import { OTP_REGEX, PASSWORD_REGEX, PHONE_NUMBER_REGEX } from '@root/apps/shared/regex';
import { IsEqualTo } from '@root/apps/util/validation';
import { OTPAction } from '@prisma/client';

export class LoginRequest {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(PHONE_NUMBER_REGEX)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(PASSWORD_REGEX)
  password: string;
}

export class RefreshTokenRequest {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}

export class SignUpRequest {
  @ApiProperty()
  @IsString()
  @Length(4)
  @Matches(OTP_REGEX)
  otp: string;
  
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(PHONE_NUMBER_REGEX)
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(PASSWORD_REGEX)
  password: string;

  @ApiProperty()
  @IsEqualTo('password')
  confirmedPassword: string;
}

export class UserWhereInput {
  @ApiProperty()
  name: string | undefined;
}
export class UserIndexRequest {
  @ApiProperty({ type: UserWhereInput })
  where: UserWhereInput;
}

export class UserUpdateInput {
  @ApiProperty()
  @IsString()
  name: string | undefined;
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(200)
  age: number | undefined;
}

export class UserUpdateRequest {
  @ApiProperty({ type: UserUpdateInput })
  data: UserUpdateInput;
}

export class SendOTPRequest {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(PHONE_NUMBER_REGEX)
  phoneNumber: string;

  @ApiProperty()
  @ValidateIf( (object, value) => (!!value && typeof value === 'string'))
  action: OTPAction;
}