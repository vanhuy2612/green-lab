import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { PrismaService } from '@root/libs/core/database/index.service';
import { LoggerService } from '@root/libs/core/logger/index.service';
import { PaginatedResponse, UserUpdateResponse } from '@root/apps/dto/response';
import { UserIndexRequest, UserUpdateRequest } from '@root/apps/dto/request';

@Injectable()
export class UserService extends BaseService {
  public model = this.prismaService.user;
  constructor(
    readonly prismaService: PrismaService,
    readonly logger: LoggerService,
  ) {
    super(
      prismaService,
      logger,
    );
  }

  async index(query: UserIndexRequest): Promise<PaginatedResponse<any>> {
    console.log('Query', query);
    const users = await this.model.findMany({
      where: query.where,
    });
    return {
      status: HttpStatus.OK,
      data: users,
      total: users.length,
      page: 1,
      size: 10,
    };
  }

  async edit(body: UserUpdateRequest): Promise<UserUpdateResponse> {
    console.log('Body', body);
    return {
      status: HttpStatus.OK,
      data: true,
    };
  }
}
