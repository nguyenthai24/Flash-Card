import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AppException } from '@/common/exceptions/app.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const error = this.buildError(exception);

    response.status(status).json({
      success: false,
      error,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private buildError(exception: unknown) {
    if (exception instanceof AppException) {
      return exception.getResponse();
    }

    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();

      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse &&
        Array.isArray(exceptionResponse.message)
      ) {
        return {
          code: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details: exceptionResponse.message,
        };
      }
    }

    if (exception instanceof HttpException) {
      return {
        code: this.getHttpErrorCode(exception),
        message: this.getHttpErrorMessage(exception),
        details: null,
      };
    }

    return {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
      details: null,
    };
  }

  private getHttpErrorCode(exception: HttpException): string {
    const status = exception.getStatus();

    return HttpStatus[status] ?? 'HTTP_ERROR';
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
    }

    return 'HTTP request failed';
  }
}
