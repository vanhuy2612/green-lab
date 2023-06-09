import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@root/libs/core/database/index.service';
import { LoggerService } from '@root/libs/core/logger/index.service';

@Injectable()
export class BaseMiddleware implements NestMiddleware {
  constructor(
    readonly prismaService: PrismaService,
    readonly logger: LoggerService,
    readonly jwtService: JwtService
  ) {}
  async use(req: any, res: any, next: (error?: any) => void) {
    next();
  }
}
