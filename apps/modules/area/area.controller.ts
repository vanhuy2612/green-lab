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
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  ApiExceptionResponse,
  ApiPaginatedResponse,
} from "@root/apps/decorator/response.decorator";
import {
  AccountDTO,
  CityDTO,
  DistrictDTO,
  PaginatedResponse,
  UserUpdateResponse,
  VillageDTO,
} from "@root/apps/dto/response";
import { RequestTransformPipe } from "@root/apps/pipe/request.pipe";
import {
  AreaListCitiesRequest,
  AreaListDistrictsRequest,
  AreaListVillagesRequest,
  UserIndexRequest,
} from "@root/apps/dto/request";
import { AuthDecorator } from "@root/apps/decorator/auth.decorator";
import { Exception } from "@root/libs/core/exception/Exception";

@ApiTags("area")
@Controller("area")
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get("/cities")
  @ApiOperation({description: "Lấy danh sách thành phố, (getAll size=-1)"})
  @ApiPaginatedResponse(CityDTO)
  @ApiExceptionResponse()
  async listCities(
    @Req() req: any,
    @Query(new RequestTransformPipe()) query: AreaListCitiesRequest,
    @AuthDecorator() auth: any
  ): Promise<PaginatedResponse<CityDTO>> {
    try {
      const result: PaginatedResponse<CityDTO> =
        await this.areaService.listCities(query);
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }

  @Get("/districts")
  @ApiOperation({description: "Lấy danh sách quận huyện, (getAll size=-1)"})
  @ApiPaginatedResponse(CityDTO)
  @ApiExceptionResponse()
  async listDistricts(
    @Req() req: any,
    @Query(new RequestTransformPipe()) query: AreaListDistrictsRequest,
    @AuthDecorator() auth: any
  ): Promise<PaginatedResponse<DistrictDTO>> {
    try {
      const result: PaginatedResponse<DistrictDTO> =
        await this.areaService.listDistricts(query);
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }

  @Get("/villages")
  @ApiOperation({description: "Lấy danh sách làng xã, (getAll size=-1)"})
  @ApiPaginatedResponse(CityDTO)
  @ApiExceptionResponse()
  async listVillages(
    @Req() req: any,
    @Query(new RequestTransformPipe()) query: AreaListVillagesRequest,
    @AuthDecorator() auth: any
  ): Promise<PaginatedResponse<VillageDTO>> {
    try {
      const result: PaginatedResponse<VillageDTO> =
        await this.areaService.listVillages(query);
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }
}
