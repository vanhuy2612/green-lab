import { HttpStatus, Injectable } from "@nestjs/common";
import { BaseService } from "../base/base.service";
import { PrismaService } from "@root/libs/core/database/index.service";
import { LoggerService } from "@root/libs/core/logger/index.service";
import {
  UserProfileResponse,
  UserUpdateProfileResponse,
} from "@root/apps/dto/response";
import { UserUpdateProfileRequest } from "@root/apps/dto/request";
import { APIException } from "@root/libs/core/exception/APIException";
import { ErrorMessageKey } from "@root/libs/core/exception/lang";

@Injectable()
export class UserService extends BaseService {
  public model = this.prismaService.user;
  constructor(
    readonly prismaService: PrismaService,
    readonly logger: LoggerService
  ) {
    super(prismaService, logger);
  }

  async profile(userId: number): Promise<UserProfileResponse> {
    const user = await this.model.findFirst({
      where: { id: userId, deletedAt: null },
      include: {
        provinceCity: true,
        district: true,
        village: true,
      },
    });
    if (!user) {
      throw new APIException(
        HttpStatus.NOT_FOUND,
        ErrorMessageKey.USER_NOT_FOUND
      );
    }
    const {
      salt: _salt,
      password: _password,
      deletedAt: _deletedAt,
      ...other
    } = user;
    return {
      status: HttpStatus.OK,
      data: {
        ...other,
      },
    };
  }

  async update(
    userId: number,
    data: UserUpdateProfileRequest
  ): Promise<UserUpdateProfileResponse> {
    const { provinceCityId, districtId, villageId } = data;
    if (provinceCityId) {
      await this.validateProvinceCity(provinceCityId);
    }
    if (districtId) {
      await this.validateDistrict(districtId);
    }
    if (villageId) {
      await this.validateDistrict(villageId);
    }
    const updated = await this.model.update({
      where: {
        id: userId,
      },
      data,
      include: {
        provinceCity: true,
        district: true,
        village: true,
      },
    });
    const {
      salt: _salt,
      password: _password,
      deletedAt: _deletedAt,
      ...other
    } = updated;
    return {
      status: HttpStatus.OK,
      data: {
        ...other,
      },
    };
  }
}
