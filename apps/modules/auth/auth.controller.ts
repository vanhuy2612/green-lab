import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { Exception } from "@root/libs/core/exception/Exception";
import {
  LoginResponse,
  RefreshTokenResponse,
  SignUpResponse,
} from "@root/apps/dto/response";
import {
  LoginRequest,
  RefreshTokenRequest,
  SignUpRequest,
} from "@root/apps/dto/request";
import { ApiTags } from "@nestjs/swagger";
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
  @CustomApiOKResponse(SignUpResponse)
  @ApiExceptionResponse()
  async signUp(@Body() body: SignUpRequest, @Req() req: any): Promise<SignUpResponse> {
    try {
      const res = await this.authService.signUp(body);
      return res;
    } catch (e) {
      await Exception.handle(req, e);
    }
  }

  @Post("refreshToken")
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

  @Post("sendOTP")
  @ApiExceptionResponse()
  async sendOTP(@Body() body: any, @Req() req: any) {
    try {
      const res = await this.authService.sendOTP(body);
      return res;
    } catch (e) {
      await Exception.handle(req, e);
    }
  }
}
