import { HttpStatus } from "@nestjs/common";
import { APIException } from "./APIException";
import { ErrorMessageKey, ErrorMessageT } from "./lang";

export class Exception {
  static async handle(req: any, e: Error | APIException | unknown | any) {
    if (!(e instanceof APIException)) {
      e = new APIException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ErrorMessageKey.UNKNOWN
      );
    }
    throw e;
  }
}
