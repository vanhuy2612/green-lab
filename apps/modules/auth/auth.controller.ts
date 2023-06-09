import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Exception } from '@root/libs/core/exception/Exception';
import { LoginResponse, SignUpResponse } from '@root/apps/dto/response';
import { LoginRequest, SignUpRequest } from '@root/apps/dto/request';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiExceptionResponse,
  CustomApiOKResponse,
} from '@root/apps/decorator/response.decorator';
import { LoggerService } from '@root/libs/core/logger/index.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {}

  @Post('login')
  @CustomApiOKResponse(LoginResponse)
  @ApiExceptionResponse()
  async login(
    @Body() body: LoginRequest,
    @Req() req: any,
  ): Promise<LoginResponse> {
    try {
      const res = await this.authService.login(body);
      return res;
    } catch (e) {
      await Exception.handle(req, e);
    }
  }

  @Post('signUp')
  @CustomApiOKResponse(SignUpResponse)
  @ApiExceptionResponse()
  async signUp(
    @Body() body: SignUpRequest,
    @Req() req: any,
  ): Promise<any> {
    try {
      const res = await this.authService.signUp(body);
      return res;
    } catch (e) {
      await Exception.handle(req, e);
    }
  }
}
