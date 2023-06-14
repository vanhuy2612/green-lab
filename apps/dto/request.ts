import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
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
import { IsEqualTo, toDate, toNumber } from "@root/apps/util/validation";
import { OTPAction } from "@prisma/client";
import {
  AreaListCitiesSortBy,
  AreaListDistrictsSortBy,
  AreaListVillagesSortBy,
  OrderBy,
} from "./common";
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
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ enum: AreaListCitiesSortBy, required: false })
  @IsOptional()
  @IsEnum(AreaListCitiesSortBy)
  sortBy?: AreaListCitiesSortBy;

  @ApiProperty({ enum: OrderBy, required: false })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => toNumber(value, { default: PAGE_DEFAULT, min: 1 }))
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) =>
    toNumber(value, { default: PAGE_SIZE_DEFAULT, min: -1 })
  )
  size?: number;
}

export class AreaListDistrictsRequest {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  provinceCityCode?: string;

  @ApiProperty({ enum: AreaListDistrictsSortBy, required: false })
  @IsOptional()
  @IsEnum(AreaListDistrictsSortBy)
  sortBy?: AreaListDistrictsSortBy;

  @ApiProperty({ enum: OrderBy, required: false })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => toNumber(value, { default: PAGE_DEFAULT, min: 1 }))
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) =>
    toNumber(value, { default: PAGE_SIZE_DEFAULT, min: -1 })
  )
  size?: number;
}

export class AreaListVillagesRequest {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  provinceCityCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  districtCode?: string;

  @ApiProperty({ enum: AreaListVillagesSortBy, required: false })
  @IsOptional()
  @IsEnum(AreaListVillagesSortBy)
  sortBy?: AreaListVillagesSortBy;

  @ApiProperty({ enum: OrderBy, required: false })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => toNumber(value, { default: PAGE_DEFAULT, min: 1 }))
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) =>
    toNumber(value, { default: PAGE_SIZE_DEFAULT, min: -1 })
  )
  size?: number;
}

export class ForgotPasswordRequest {
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

export class UserUpdateProfileRequest {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(2000)
  provinceCityId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(2000)
  districtId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(2000)
  villageId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @Transform(({ value }) => toDate(value))
  @IsOptional()
  @IsDate()
  birthday: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  sex: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 5)
  regionCode: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  address: string;
}
