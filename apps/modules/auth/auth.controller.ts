import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { Exception } from "@root/libs/core/exception/Exception";
import {
  ForgotPasswordResponse,
  LoginResponse,
  RefreshTokenResponse,
  SendOTPResponse,
  SignUpResponse,
} from "@root/apps/dto/response";
import {
  ForgotPasswordRequest,
  LoginRequest,
  RefreshTokenRequest,
  SendOTPRequest,
  SignUpRequest,
} from "@root/apps/dto/request";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  ApiExceptionResponse,
  CustomApiOKResponse,
} from "@root/apps/decorator/response.decorator";
import { LoggerService } from "@root/libs/core/logger/index.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService
  ) {}

  @Post("login")
  @ApiOperation({
    summary: "API đăng nhập (Not Auth)",
    description: "API đăng nhập (Not Auth)",
  })
  @CustomApiOKResponse(LoginResponse)
  @ApiExceptionResponse()
  async login(
    @Body() body: LoginRequest,
    @Req() req: any
  ): Promise<LoginResponse> {
    try {
      const res = await this.authService.login(body);
      return res;
    } catch (e) {
      await Exception.handle(req, e);
    }
  }

  @Post("signUp")
  @ApiOperation({
    summary: "API đăng ký tài khoản (Not Auth)",
    description: "API đăng kí tài khoản (Not Auth)",
  })
  @CustomApiOKResponse(SignUpResponse)
  @ApiExceptionResponse()
  async signUp(
    @Body() body: SignUpRequest,
    @Req() req: any
  ): Promise<SignUpResponse> {
    try {
      const res = await this.authService.signUp(body);
      return res;
    } catch (e) {
      await Exception.handle(req, e);
    }
  }

  @Post("refreshToken")
  @ApiOperation({
    summary: "API Refresh token bị hết hạn (Not Auth)",
    description: "API Refresh token bị hết hạn",
  })
  @CustomApiOKResponse(RefreshTokenResponse)
  @ApiExceptionResponse()
  async refreshToken(
    @Body() body: RefreshTokenRequest,
    @Req() req: any
  ): Promise<RefreshTokenResponse> {
    try {
      const res = await this.authService.refreshToken(body);
      return res;
    } catch (e) {
      await Exception.handle(req, e);
    }
  }

  @Post("forgotPassword")
  @ApiOperation({
    summary: "API Quên mật khẩu (Not Auth)",
    description: "API Quên mật khẩu",
  })
  @CustomApiOKResponse(ForgotPasswordResponse)
  @ApiExceptionResponse()
  async forgotPassword(
    @Body() body: ForgotPasswordRequest,
    @Req() req: any
  ): Promise<ForgotPasswordResponse> {
    try {
      const res = await this.authService.forgotPassword(body);
      return res;
    } catch (e) {
      await Exception.handle(req, e);
    }
  }

  @Post("sendOTP")
  @ApiOperation({
    summary:
      "API gửi mã OTP cho nhiều tính năng khác nhau (đăng ký, ...) (Not Auth)",
    description: "PI gửi mã OTP cho nhiều tính năng khác nhau (đăng ký, ...)",
  })
  @ApiExceptionResponse()
  async sendOTP(
    @Body() body: SendOTPRequest,
    @Req() req: any
  ): Promise<SendOTPResponse> {
    try {
      const res = await this.authService.sendOTP(body);
      return res;
    } catch (e) {
      await Exception.handle(req, e);
    }
  }
}
