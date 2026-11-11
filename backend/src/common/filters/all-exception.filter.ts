import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { AppException } from '@/common/exceptions/app.exception';
import { ErrorCode } from '@/common/constants/error-code.constant';

interface ErrorResponse {
  success: false;
  error_code: number;
  error_message: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode = this.getHttpStatus(exception);
    const errorResponse = this.buildErrorResponse(exception);

    console.log(statusCode);

    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    this.logger.error(
      `${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    response.status(statusCode).json({
      ...errorResponse,
    });
  }

  private getHttpStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private buildErrorResponse(exception: unknown): ErrorResponse {
    // 1. Custom business exception
    if (exception instanceof AppException) {
      return {
        success: false,
        error_code: exception.errorCode,
        error_message: exception.message,
      };
    }

    // 2. Validation exception from ValidationPipe
    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();

      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse &&
        Array.isArray(exceptionResponse.message)
      ) {
        return {
          success: false,
          error_code: ErrorCode.VALIDATION_ERROR,
          error_message: 'Request validation failed',
        };
      }
    }

    // 3. Other NestJS HTTP exceptions
    if (exception instanceof HttpException) {
      return {
        success: false,
        error_code: this.getErrorCode(exception.getStatus()),
        error_message: this.getHttpErrorMessage(exception),
      };
    }

    // 4. Unknown / unexpected exceptions
    return {
      success: false,
      error_code: ErrorCode.INTERNAL_SERVER_ERROR,
      error_message: 'Internal server error',
    };
  }

  private getErrorCode(statusCode: number): ErrorCode {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        return ErrorCode.BAD_REQUEST;

      case HttpStatus.UNAUTHORIZED:
        return ErrorCode.UNAUTHORIZED;

      case HttpStatus.FORBIDDEN:
        return ErrorCode.FORBIDDEN;

      case HttpStatus.NOT_FOUND:
        return ErrorCode.NOT_FOUND;

      case HttpStatus.CONFLICT:
        return ErrorCode.CONFLICT;

      default:
        return ErrorCode.INTERNAL_SERVER_ERROR;
    }
  }

  private getHttpErrorMessage(exception: HttpException): string {
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      const message = exceptionResponse.message;

      if (typeof message === 'string') {
        return message;
      }

      if (Array.isArray(message)) {
        return 'Request validation failed';
      }
    }

    return 'HTTP request failed';
  }
}
