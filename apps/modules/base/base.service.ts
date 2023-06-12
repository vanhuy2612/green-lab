import { Injectable } from "@nestjs/common";
import { PrismaService } from "@libs/core/database/index.service";
import { LoggerService } from "@root/libs/core/logger/index.service";

@Injectable()
export class BaseService {
  public model: any;
  constructor(
    readonly prismaService: PrismaService,
    readonly logger: LoggerService
  ) {}
}
