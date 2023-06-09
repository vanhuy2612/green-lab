import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { APIException } from '@root/libs/core/exception/APIException';
import { PrismaService } from '@root/libs/core/database/index.service';
import { LoggerService } from '@root/libs/core/logger/index.service';
import { ErrorMessageKey } from '@root/libs/core/exception/lang';
import { LoginResponse, SignUpResponse } from '@root/apps/dto/response';
import { LoginRequest, SignUpRequest } from '@root/apps/dto/request';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { authConfig } from '@root/apps/shared/auth';
import { compare, hash } from '@root/libs/util/util';

@Injectable()
export class AuthService extends BaseService {
  model = this.prismaService.user;
  constructor(
    readonly prismaService: PrismaService,
    readonly logger: LoggerService,
    readonly jwtService: JwtService,
  ) {
    super(
      prismaService,
      logger,
    );
  }

  async login(params: LoginRequest): Promise<LoginResponse> {
    const { phoneNumber, password: plainPassword } = params;
    const user: User | null = await this.model.findFirst(
      {
        where: {
          phoneNumber,
        },
      },
    );
    if (!user)
      throw new APIException(
        HttpStatus.NOT_FOUND,
        ErrorMessageKey.USER_NOT_FOUND,
      );
    const { salt, password } = user;
    const isPasswordValid = await compare(plainPassword, salt, password);
    if (!isPasswordValid) throw new APIException(
      HttpStatus.BAD_REQUEST,
      ErrorMessageKey.PASSWORD_IS_INVALID,
    );
    const { salt: _salt, password: _password, ...other } = user;
    return {
      statusCode: HttpStatus.OK,
      data: {
        token: this.jwtService.sign(
          {
            ...other,
          },
          {
            secret: authConfig.JWT_SECRET_KEY,
            expiresIn: authConfig.JWT_EXPIRE_IN,
          },
        ),
      },
    };
  }

  async signUp(params: SignUpRequest): Promise<SignUpResponse> {
    return {
      status: HttpStatus.OK,
      data: true,
    }
  }
}
