import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Exception } from "@root/libs/core/exception/Exception";
import { UserService } from "./user.service";
import {
  AccountDTO,
  PaginatedResponse,
  UserUpdateResponse,
} from "@root/apps/dto/response";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  ApiExceptionResponse,
  ApiPaginatedResponse,
} from "@root/apps/decorator/response.decorator";
import { AuthDecorator } from "@root/apps/decorator/auth.decorator";
import { UserIndexRequest, UserUpdateRequest } from "@root/apps/dto/request";
import { RequestTransformPipe } from "@root/apps/pipe/request.pipe";
import { AuthGuard } from "@root/apps/guard/auth.guard";

@ApiTags("users")
@Controller("users")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({description: "Chưa sử dụng"})
  @ApiBearerAuth()
  @ApiPaginatedResponse(AccountDTO)
  @ApiExceptionResponse()
  async index(
    @Req() req: any,
    @Body(new RequestTransformPipe()) query: UserIndexRequest,
    @AuthDecorator() auth: any
  ): Promise<PaginatedResponse<AccountDTO>> {
    try {
      console.log("Request.users.index", auth, auth.permissions);
      const result = await this.userService.index(query);
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }

  @Put("/:id")
  @ApiOperation({description: "Chưa sử dụng"})
  @ApiBearerAuth()
  @ApiExceptionResponse()
  async edit(
    @Req() req: any,
    @Body(new RequestTransformPipe())
    body: UserUpdateRequest,
    @Param("id", ParseIntPipe) id: number,
    @AuthDecorator() auth: any
  ): Promise<UserUpdateResponse> {
    try {
      console.log("id", id);
      console.log("Request.users.edit", auth, auth.permissions);

      const result = await this.userService.edit(body);
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }
}
