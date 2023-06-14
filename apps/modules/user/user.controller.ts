import { Body, Controller, Get, Put, Req, UseGuards } from "@nestjs/common";
import { Exception } from "@root/libs/core/exception/Exception";
import { UserService } from "./user.service";
import {
  UserUpdateProfileResponse,
  UserProfileResponse,
} from "@root/apps/dto/response";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  ApiExceptionResponse,
  CustomApiOKResponse,
} from "@root/apps/decorator/response.decorator";
import { AuthDecorator } from "@root/apps/decorator/auth.decorator";
import { UserUpdateProfileRequest } from "@root/apps/dto/request";
import { AuthGuard } from "@root/apps/guard/auth.guard";
import { ProfileDTO } from "@root/apps/dto/common";

@ApiTags("users")
@Controller("users")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("profile")
  @ApiOperation({
    summary: "API Người dùng tự lấy thông tin profile của bản thân",
    description: "API Người dùng tự lấy thông tin profile của bản thân",
  })
  @ApiBearerAuth()
  @CustomApiOKResponse(ProfileDTO)
  @ApiExceptionResponse()
  async profile(
    @Req() req: any,
    @AuthDecorator() auth: any
  ): Promise<UserProfileResponse> {
    try {
      const result = await this.userService.profile(auth.id);
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }

  @Put("update")
  @ApiOperation({
    summary: "API Người dùng tự update thông tin profile của bản thân",
    description: "API Người dùng tự update thông tin profile của bản thân",
  })
  @ApiBearerAuth()
  @CustomApiOKResponse(ProfileDTO)
  @ApiExceptionResponse()
  async update(
    @Req() req: any,
    @Body() body: UserUpdateProfileRequest,
    @AuthDecorator() auth: any
  ): Promise<UserUpdateProfileResponse> {
    try {
      const result = await this.userService.update(auth.id, body);
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }
}
