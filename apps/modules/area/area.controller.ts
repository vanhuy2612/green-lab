import { Controller, Get, Query, Req } from "@nestjs/common";
import { AreaService } from "./area.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  ApiExceptionResponse,
  ApiPaginatedResponse,
} from "@root/apps/decorator/response.decorator";

import { RequestTransformPipe } from "@root/apps/pipe/request.pipe";
import {
  AreaListCitiesRequest,
  AreaListDistrictsRequest,
  AreaListVillagesRequest,
} from "@root/apps/dto/request";
import { AuthDecorator } from "@root/apps/decorator/auth.decorator";
import { Exception } from "@root/libs/core/exception/Exception";
import {
  DistrictDTO,
  ProvinceCityDTO,
  VillageDTO,
} from "@root/apps/dto/common";
import { PaginatedResponse } from "@root/apps/dto/response";

@ApiTags("area")
@Controller("area")
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get("/cities")
  @ApiOperation({
    summary: "API lấy danh sách thành phố, (getAll size=-1)",
    description: "Lấy danh sách thành phố, (getAll size=-1)",
  })
  @ApiPaginatedResponse(ProvinceCityDTO)
  @ApiExceptionResponse()
  async listCities(
    @Req() req: any,
    @Query(new RequestTransformPipe()) query: AreaListCitiesRequest,
    @AuthDecorator() auth: any
  ): Promise<PaginatedResponse<ProvinceCityDTO>> {
    try {
      const result: PaginatedResponse<ProvinceCityDTO> =
        await this.areaService.listCities(query);
      return result;
    } catch (e) {
      console.log(e);
      await Exception.handle(req, e);
    }
  }

  @Get("/districts")
  @ApiOperation({
    summary: "API lấy danh sách quận huyện, (getAll size=-1)",
    description: "Lấy danh sách quận huyện, (getAll size=-1)",
  })
  @ApiPaginatedResponse(DistrictDTO)
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
  @ApiOperation({
    summary: "API lấy danh sách làng xã, (getAll size=-1)",
    description: "Lấy danh sách làng xã, (getAll size=-1)",
  })
  @ApiPaginatedResponse(VillageDTO)
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
