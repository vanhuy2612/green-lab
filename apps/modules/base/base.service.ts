import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@libs/core/database/index.service";
import { LoggerService } from "@root/libs/core/logger/index.service";
import { District, ProvinceCity, Village } from "@prisma/client";
import { APIException } from "@root/libs/core/exception/APIException";
import { ErrorMessageKey } from "@root/libs/core/exception/lang";

@Injectable()
export class BaseService {
  public model: any;
  constructor(
    readonly prismaService: PrismaService,
    readonly logger: LoggerService
  ) {}

  async validateProvinceCity(provinceCityId: number): Promise<ProvinceCity> {
    const provinceCity: ProvinceCity | null =
      await this.prismaService.provinceCity.findFirst({
        where: { id: provinceCityId },
      });
    if (!provinceCity) {
      throw new APIException(HttpStatus.NOT_FOUND, ErrorMessageKey.BAD_REQUEST);
    }
    return provinceCity;
  }

  async validateDistrict(districtId: number): Promise<District> {
    const district: District | null =
      await this.prismaService.district.findFirst({
        where: { id: districtId },
      });
    if (!district) {
      throw new APIException(HttpStatus.NOT_FOUND, ErrorMessageKey.BAD_REQUEST);
    }
    return district;
  }

  async validateVillage(villageId: number): Promise<Village> {
    const village: Village | null = await this.prismaService.village.findFirst({
      where: { id: villageId },
    });
    if (!village) {
      throw new APIException(HttpStatus.NOT_FOUND, ErrorMessageKey.BAD_REQUEST);
    }
    return village;
  }
}
