import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { authConfig } from "../shared/auth";
import { APIException } from "@root/libs/core/exception/APIException";
import { ErrorMessageKey } from "@root/libs/core/exception/lang";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: authConfig.JWT_SECRET_KEY,
      });
      // Assign user's information to auth
      request["auth"] = payload;
    } catch {
      throw new APIException(
        HttpStatus.UNAUTHORIZED,
        ErrorMessageKey.TOKEN_IS_INVALID
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
