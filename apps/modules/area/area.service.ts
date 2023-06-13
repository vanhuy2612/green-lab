import { HttpStatus, Injectable } from "@nestjs/common";
import { BaseService } from "../base/base.service";
import { PrismaService } from "@root/libs/core/database/index.service";
import { LoggerService } from "@root/libs/core/logger/index.service";
import { AreaListCitiesRequest, AreaListDistrictsRequest, AreaListVillagesRequest } from "@root/apps/dto/request";
import { CityDTO, DistrictDTO, PaginatedResponse, VillageDTO } from "@root/apps/dto/response";
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from "@root/apps/shared/constant";

@Injectable()
export class AreaService extends BaseService {
  constructor(
    readonly prismaService: PrismaService,
    readonly logger: LoggerService
  ) {
    super(prismaService, logger);
  }

  async listCities(
    query: AreaListCitiesRequest
  ): Promise<PaginatedResponse<CityDTO>> {
    const {
      page = PAGE_DEFAULT,
      size = PAGE_SIZE_DEFAULT,
      orderBy,
      sortBy,
      ...filter
    } = query;
    const list = await this.prismaService.provinceCity.findMany({
      where: filter,
      orderBy: {
        [sortBy]: orderBy,
      },
      skip: size < 0 ? 0 : (page - 1) * size,
      take: size < 0 ? undefined : size,
    });
    const total: number = await this.prismaService.provinceCity.count({
      where: filter,
    });
    return {
      status: HttpStatus.OK,
      data: list,
      total,
      page,
      size,
    };
  }

  async listDistricts(
    query: AreaListDistrictsRequest
  ): Promise<PaginatedResponse<DistrictDTO>> {
    const {
      page = PAGE_DEFAULT,
      size = PAGE_SIZE_DEFAULT,
      orderBy,
      sortBy,
      ...filter
    } = query;
    const list = await this.prismaService.district.findMany({
      where: filter,
      orderBy: {
        [sortBy]: orderBy,
      },
      skip: size < 0 ? 0 : (page - 1) * size,
      take: size < 0 ? undefined : size,
    });
    const total: number = await this.prismaService.district.count({
      where: filter,
    });
    return {
      status: HttpStatus.OK,
      data: list,
      total,
      page,
      size,
    };
  }

  async listVillages(
    query: AreaListVillagesRequest
  ): Promise<PaginatedResponse<VillageDTO>> {
    const {
      page = PAGE_DEFAULT,
      size = PAGE_SIZE_DEFAULT,
      orderBy,
      sortBy,
      ...filter
    } = query;
    const list = await this.prismaService.village.findMany({
      where: filter,
      orderBy: {
        [sortBy]: orderBy,
      },
      skip: size < 0 ? 0 : (page - 1) * size,
      take: size < 0 ? undefined : size,
    });
    const total: number = await this.prismaService.village.count({
      where: filter,
    });
    return {
      status: HttpStatus.OK,
      data: list,
      total,
      page,
      size,
    };
  }
}
