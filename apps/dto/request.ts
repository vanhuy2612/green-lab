import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from "class-validator";
import {
  OTP_REGEX,
  PASSWORD_REGEX,
  PHONE_NUMBER_REGEX,
} from "@root/apps/shared/regex";
import { IsEqualTo, toNumber } from "@root/apps/util/validation";
import { OTPAction } from "@prisma/client";
import { AreaListCitiesSortBy, OrderBy } from "./common";
import { Transform } from "class-transformer";
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from "../shared/constant";
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
  @IsEqualTo("password")
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
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(PHONE_NUMBER_REGEX)
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  userId?: number;

  @ApiProperty({
    enum: OTPAction,
    enumName: "OTPAction",
  })
  @IsEnum(OTPAction)
  action: OTPAction;
}

export class AreaListCitiesRequest {
  @ApiProperty()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ enum: AreaListCitiesSortBy })
  @IsOptional()
  @IsEnum(AreaListCitiesSortBy)
  sortBy?: AreaListCitiesSortBy;

  @ApiProperty({ enum: OrderBy })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => toNumber(value, { default: PAGE_DEFAULT, min: 1 }))
  page?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) =>
    toNumber(value, { default: PAGE_SIZE_DEFAULT, min: -1 })
  )
  size?: number;
}
