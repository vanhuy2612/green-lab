import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AreaService } from "./area.service";
import { ApiTags } from "@nestjs/swagger";
import {
  ApiExceptionResponse,
  ApiPaginatedResponse,
} from "@root/apps/decorator/response.decorator";
import {
  AccountDTO,
  CityDTO,
  PaginatedResponse,
  UserUpdateResponse,
} from "@root/apps/dto/response";
import { RequestTransformPipe } from "@root/apps/pipe/request.pipe";
import {
  AreaListCitiesRequest,
  UserIndexRequest,
} from "@root/apps/dto/request";
import { AuthDecorator } from "@root/apps/decorator/auth.decorator";
import { Exception } from "@root/libs/core/exception/Exception";

@ApiTags("area")
@Controller("area")
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get("/cities")
  @ApiPaginatedResponse(CityDTO)
  @ApiExceptionResponse()
  async index(
    @Req() req: any,
    @Query(new RequestTransformPipe()) query: AreaListCitiesRequest,
    @AuthDecorator() auth: any
  ): Promise<PaginatedResponse<CityDTO>> {
    try {
      console.log("Request.users.index", auth, auth.permissions);
      const result: PaginatedResponse<CityDTO> =
        await this.areaService.listCities(query);
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }
}
