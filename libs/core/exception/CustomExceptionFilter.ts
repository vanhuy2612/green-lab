import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { APIException } from "./APIException";
import { ErrorMessageT } from "./lang";
import { ThrottlerException } from "@nestjs/throttler";
import {
  PrismaClientExtensionError,
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException | APIException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const defaultLang: string = "en";
    const lang: string = (request.headers["lang"] as string) || defaultLang;
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
        error: ERROR_MESSAGES[exception.message] || ERROR_MESSAGES["UNKNOWN"],
      });
    }

    if (exception instanceof ThrottlerException) {
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        data: {},
        error: ERROR_MESSAGES["TOO_MANY_REQUEST"],
      });
    }

    if (exception instanceof BadRequestException) {
      return response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        error:
          (exception.getResponse() as any).message || ERROR_MESSAGES["UNKNOWN"],
      });
    }

    if (
      exception instanceof PrismaClientExtensionError ||
      exception instanceof PrismaClientRustPanicError ||
      exception instanceof PrismaClientValidationError ||
      exception instanceof PrismaClientKnownRequestError ||
      exception instanceof PrismaClientInitializationError ||
      exception instanceof PrismaClientInitializationError
    ) {
      return response.status(500).json({
        statusCode: 500,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: (exception.getResponse() as any).message,
      });
    }

    return response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception.message || ERROR_MESSAGES["UNKNOWN"],
    });
  }
}
