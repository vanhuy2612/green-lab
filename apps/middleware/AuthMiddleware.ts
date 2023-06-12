import { HttpStatus, Injectable } from "@nestjs/common";
import Env from "@root/libs/Env";
import { BaseMiddleware } from "./BaseMiddleware";
import { APIException } from "@root/libs/core/exception/APIException";
import { ErrorMessageKey } from "@root/libs/core/exception/lang";

@Injectable()
export class AuthMiddleware extends BaseMiddleware {
  async use(req: any, res: any, next: (error?: any) => void) {
    const bear: string = req.headers["authorization"] || "";
    const token: string = bear.replace(/Bearer /gi, "");

    try {
      const auth: any = this.jwtService.verify(token, {
        secret: Env.get("JWT_SECRET", "nguoianhmuonquen"),
      });
      if (!auth.id) {
        throw new APIException(
          HttpStatus.UNAUTHORIZED,
          ErrorMessageKey.TOKEN_IS_INVALID
        );
      }
      // Save auth to req
      req.auth = auth;
      next();
    } catch (e) {
      throw new APIException(
        HttpStatus.UNAUTHORIZED,
        ErrorMessageKey.TOKEN_IS_INVALID
      );
    }
  }
}
