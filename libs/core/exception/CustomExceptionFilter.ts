import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { APIException } from './APIException';
import { ErrorMessageT } from './lang';
import { ThrottlerException } from '@nestjs/throttler';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException | APIException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const defaultLang: string = 'en';
    const lang: string = (request.headers['lang'] as string) || defaultLang;
    let ERROR_MESSAGES: ErrorMessageT;
    try {
      ERROR_MESSAGES = (await import(`../exception/lang/${lang}`)).default;
    } catch (e) {
      ERROR_MESSAGES = (await import(`../exception/lang/${defaultLang}`))
        .default;
    }
    
    if (exception instanceof APIException) {
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        data: exception.data,
        error: ERROR_MESSAGES[exception.message] || ERROR_MESSAGES['UNKNOWN'],
      });
    }

    if (exception instanceof ThrottlerException) {
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        data: {},
        error: ERROR_MESSAGES['TOO_MANY_REQUEST'],
      });
    }

    if (exception instanceof BadRequestException) {
      console.log(exception.getResponse())
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: (exception.getResponse() as any).message || ERROR_MESSAGES['UNKNOWN'],
      });
    }

    return response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception.message || ERROR_MESSAGES['UNKNOWN'],
    });
  }
}
