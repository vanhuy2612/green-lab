import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { PASSWORD_REGEX, PHONE_NUMBER_REGEX } from '../shared/regex';

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

export class SignUpRequest {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Matches(PHONE_NUMBER_REGEX)
  phoneNumber: string;
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
