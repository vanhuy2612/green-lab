import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessageKey } from './lang';

export class APIException extends HttpException {
  data: any;
  constructor(
    status: HttpStatus,
    message: string | ErrorMessageKey | Record<string, any>,
    data?: any,
  ) {
    super(message, status);
    this.data = data;
  }
}
