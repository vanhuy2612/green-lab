import { HttpStatus, Injectable } from "@nestjs/common";
import { BaseService } from "../base/base.service";
import { APIException } from "@root/libs/core/exception/APIException";
import { PrismaService } from "@root/libs/core/database/index.service";
import { LoggerService } from "@root/libs/core/logger/index.service";
import { ErrorMessageKey } from "@root/libs/core/exception/lang";
import {
  LoginResponse,
  RefreshTokenResponse,
  SendOTPResponse,
  SignUpResponse,
} from "@root/apps/dto/response";
import {
  LoginRequest,
  RefreshTokenRequest,
  SendOTPRequest,
  SignUpRequest,
} from "@root/apps/dto/request";
import { JwtService } from "@nestjs/jwt";
import { OTP, Prisma, User } from "@prisma/client";
import { authConfig } from "@root/apps/shared/auth";
import { compare, generateOTP, hash, unixMoment } from "@root/apps/util/util";
import { v4 } from "uuid";
import { ESMSService } from "@root/apps/service/esms";
import { ThirdPartyResponse } from "@root/apps/service";
import { OTP_EXPIRE_IN } from "@root/apps/shared/constant";

@Injectable()
export class AuthService extends BaseService {
  model = this.prismaService.user;
  constructor(
    readonly prismaService: PrismaService,
    readonly logger: LoggerService,
    readonly jwtService: JwtService
  ) {
    super(prismaService, logger);
  }

  async login(params: LoginRequest): Promise<LoginResponse> {
    const { phoneNumber, password: plainPassword } = params;
    const user: User | null = await this.model.findFirst({
      where: {
        phoneNumber,
        deletedAt: null,
      },
    });
    if (!user) {
      throw new APIException(
        HttpStatus.NOT_FOUND,
        ErrorMessageKey.USER_NOT_FOUND
      );
    }
    const { salt, password } = user;
    const isPasswordValid = await compare(plainPassword, salt, password);
    if (!isPasswordValid) {
      throw new APIException(
        HttpStatus.BAD_REQUEST,
        ErrorMessageKey.PASSWORD_IS_INVALID
      );
    }
    const { salt: _salt, password: _password, ...other } = user;
    const accessToken: string = this.jwtService.sign(
      {
        ...other,
      },
      {
        secret: authConfig.JWT_SECRET_KEY,
        expiresIn: authConfig.JWT_ACCESS_TOKEN_EXPIRE_IN,
      }
    );
    const refreshToken: string = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: authConfig.JWT_SECRET_KEY,
        expiresIn: authConfig.JWT_REFRESH_TOKEN_EXPIRE_IN,
      }
    );
    return {
      statusCode: HttpStatus.OK,
      data: {
        accessToken,
        refreshToken,
      },
    };
  }

  async refreshToken(
    params: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    const { refreshToken } = params;
    let auth: { id: number };
    try {
      auth = this.jwtService.verify(refreshToken, {
        secret: authConfig.JWT_SECRET_KEY,
      }) as { id: number };
    } catch (e) {
      throw new APIException(
        HttpStatus.UNAUTHORIZED,
        ErrorMessageKey.REFRESH_TOKEN_IS_INVALID
      );
    }

    const user: User | null = await this.model.findFirst({
      where: {
        id: auth.id,
        deletedAt: null,
      },
    });
    if (!user) {
      throw new APIException(
        HttpStatus.NOT_FOUND,
        ErrorMessageKey.USER_NOT_FOUND
      );
    }

    const { salt: _salt, password: _password, ...other } = user;
    const accessToken: string = this.jwtService.sign(
      {
        ...other,
      },
      {
        secret: authConfig.JWT_SECRET_KEY,
        expiresIn: authConfig.JWT_ACCESS_TOKEN_EXPIRE_IN,
      }
    );

    return {
      statusCode: HttpStatus.OK,
      data: {
        accessToken,
        refreshToken,
      },
    };
  }

  async signUp(params: SignUpRequest): Promise<SignUpResponse> {
    const { phoneNumber, password, otp } = params;
    const validOTP: OTP | null = await this.prismaService.oTP.findFirst({
      where: {
        phoneNumber,
        code: otp,
        expiredAt: {
          gte: unixMoment().format(),
        },
      },
    });
    if (!validOTP) {
        throw new APIException(
          HttpStatus.BAD_REQUEST,
          ErrorMessageKey.OTP_IS_INVALID
        );
    }
    const existUser: User | null = await this.model.findFirst({
      where: {
        phoneNumber,
      },
    });
    if (existUser) {
      throw new APIException(
        HttpStatus.BAD_REQUEST,
        ErrorMessageKey.USER_ALREADY_EXIST
      );
    }
    const salt: string = v4();
    const encryptedPassword: string = await hash(password, salt);
    const created: User = await this.model.create({
      data: {
        phoneNumber,
        salt,
        password: encryptedPassword,
      },
    });
    return {
      status: HttpStatus.OK,
      data: {
        id: created.id,
        phoneNumber: created.phoneNumber,
      },
    };
  }

  async sendOTP(params: SendOTPRequest): Promise<SendOTPResponse> {
    const service = new ESMSService();
    const { phoneNumber, userId, action } = params;
    if (!phoneNumber && !userId) {
      throw new APIException(
        HttpStatus.BAD_REQUEST,
        ErrorMessageKey.BAD_REQUEST
      );
    }
    if (userId) {
      const user: User | null = await this.model.findFirst({
        where: {
          id: userId,
          deletedAt: null,
        },
      });
      if (!user) {
        throw new APIException(
          HttpStatus.NOT_FOUND,
          ErrorMessageKey.USER_NOT_FOUND
        );
      }
    }
    const otpCode: string = generateOTP();

    const otp: OTP = await this.prismaService.$transaction<OTP>(
      async (prismaTrx: Prisma.TransactionClient) => {
        await prismaTrx.oTP.deleteMany({
          where: {
            OR: [
              {
                expiredAt: {
                  lte: unixMoment().format(),
                },
              },
              {
                phoneNumber,
                userId,
                action,
              },
            ],
          },
        });
        return await prismaTrx.oTP.create({
          data: {
            userId,
            phoneNumber,
            code: otpCode,
            action,
            expiredAt: unixMoment().add("second", OTP_EXPIRE_IN).format(),
          },
        });
      }
    );
    const content = `Your OTP is ${otp.code}`;
    console.log(content);
    const result: ThirdPartyResponse<boolean> = await service.sendOTP(
      phoneNumber,
      content
    );
    if (!result.error) {
      throw new APIException(HttpStatus.INTERNAL_SERVER_ERROR, ErrorMessageKey);
    }
    return {
      status: HttpStatus.OK,
      data: true,
    };
  }
}
