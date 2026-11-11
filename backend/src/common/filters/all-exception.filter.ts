// import {
//   ArgumentsHost,
//   BadRequestException,
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   HttpStatus,
//   Logger,
// } from '@nestjs/common';

// import { Request, Response } from 'express';

// import { AppException } from '@/common/exceptions/app.exception';
// import { ErrorCode } from '@/common/constants/error-code.constant';

// interface ErrorResponse {
//   success: false;
//   error_code: number;
//   error_message: string;
//   data?: any;
// }

// @Catch()
// export class AllExceptionFilter implements ExceptionFilter {
//   private readonly logger = new Logger(AllExceptionFilter.name);

//   catch(exception: unknown, host: ArgumentsHost): void {
//     const ctx = host.switchToHttp();

//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     const statusCode = this.getHttpStatus(exception);
//     const errorResponse = this.buildErrorResponse(exception);

//     console.log(statusCode);

//     // if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
//     //   this.logger.error(
//     //     `${request.method} ${request.url}`,
//     //     exception instanceof Error ? exception.stack : String(exception),
//     //   );
//     // }

//     this.logger.error(
//       `${request.method} ${request.url}`,
//       exception instanceof Error ? exception.stack : String(exception),
//     );

//     response.status(statusCode).json({
//       ...errorResponse,
//     });
//   }

//   private getHttpStatus(exception: unknown): number {
//     if (exception instanceof HttpException) {
//       return exception.getStatus();
//     }

//     return HttpStatus.INTERNAL_SERVER_ERROR;
//   }

//   private buildErrorResponse(exception: unknown): ErrorResponse {
//     // 1. Custom business exception
//     if (exception instanceof AppException) {
//       return {
//         success: false,
//         error_code: exception.errorCode,
//         error_message: exception.message,
//       };
//     }

//     // 2. Validation exception from ValidationPipe
//     // if (exception instanceof BadRequestException) {
//     //   const exceptionResponse = exception.getResponse();
//     //   console.log(exceptionResponse);
//     //   if (
//     //     typeof exceptionResponse === 'object' &&
//     //     exceptionResponse !== null &&
//     //     'message' in exceptionResponse &&
//     //     Array.isArray(exceptionResponse.message)
//     //   ) {
//     //     return {
//     //       success: false,
//     //       error_code: ErrorCode.VALIDATION_ERROR,
//     //       error_message: 'Request validation failed',
//     //     };
//     //   }
//     // }

//     if (exception instanceof BadRequestException) {
//       const body = exception.getResponse();
//       console.log(body);
//       if (typeof body === 'object' && body !== null) {
//         const validationErrors =
//           'errors' in body && typeof body.errors === 'object'
//             ? body.errors
//             : null;

//         if (validationErrors) {
//           return {
//             success: false,
//             error_code: ErrorCode.VALIDATION_ERROR,
//             error_message: 'Validation failed',
//             data: validationErrors,
//           };
//         }
//       }
//     }

//     // 3. Other NestJS HTTP exceptions
//     if (exception instanceof HttpException) {
//       return {
//         success: false,
//         error_code: this.getErrorCode(exception.getStatus()),
//         error_message: this.getHttpErrorMessage(exception),
//       };
//     }

//     // 4. Unknown / unexpected exceptions
//     return {
//       success: false,
//       error_code: ErrorCode.INTERNAL_SERVER_ERROR,
//       error_message: 'Internal server error',
//     };
//   }

//   private getErrorCode(statusCode: number): ErrorCode {
//     switch (statusCode) {
//       case HttpStatus.BAD_REQUEST:
//         return ErrorCode.BAD_REQUEST;

//       case HttpStatus.UNAUTHORIZED:
//         return ErrorCode.UNAUTHORIZED;

//       case HttpStatus.FORBIDDEN:
//         return ErrorCode.FORBIDDEN;

//       case HttpStatus.NOT_FOUND:
//         return ErrorCode.NOT_FOUND;

//       case HttpStatus.CONFLICT:
//         return ErrorCode.CONFLICT;

//       default:
//         return ErrorCode.INTERNAL_SERVER_ERROR;
//     }
//   }

//   private getHttpErrorMessage(exception: HttpException): string {
//     const exceptionResponse = exception.getResponse();

//     if (typeof exceptionResponse === 'string') {
//       return exceptionResponse;
//     }

//     if (
//       typeof exceptionResponse === 'object' &&
//       exceptionResponse !== null &&
//       'message' in exceptionResponse
//     ) {
//       const message = exceptionResponse.message;

//       if (typeof message === 'string') {
//         return message;
//       }

//       if (Array.isArray(message)) {
//         return 'Request validation failed';
//       }
//     }

//     return 'HTTP request failed';
//   }
// }

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import type { Request, Response } from 'express';

import { AppException } from '@/common/exceptions/app.exception';
import { ErrorCode } from '@/common/constants/error-code.constant';

// Cấu trúc response chuẩn khi API xảy ra lỗi
interface ErrorResponse {
  success: false;
  error_code: number;
  error_message: string;
  data: unknown;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  // Logger riêng cho AllExceptionFilter
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    // Lấy HTTP context để truy cập request và response
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Xác định HTTP status và chuẩn hóa dữ liệu lỗi
    const statusCode = this.getHttpStatus(exception);
    const errorResponse = this.buildErrorResponse(exception);

    // Ghi log exception theo mức độ nghiêm trọng
    this.logException(exception, request, statusCode);

    // Trả response lỗi về client
    response.status(statusCode).json(errorResponse);
  }

  /**
   * Xác định HTTP status từ exception.
   * Nếu không phải HttpException thì mặc định là 500.
   */
  private getHttpStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
   * Chuẩn hóa tất cả exception về cấu trúc response thống nhất.
   */
  private buildErrorResponse(exception: unknown): ErrorResponse {
    // 1. Xử lý lỗi nghiệp vụ do ứng dụng chủ động tạo ra
    if (exception instanceof AppException) {
      return {
        success: false,
        error_code: exception.errorCode,
        error_message: exception.message,
        data: null,
      };
    }

    // 2. Xử lý lỗi validation được tạo từ ValidationPipe
    if (exception instanceof BadRequestException) {
      const body = exception.getResponse();

      console.log(body);

      // Kiểm tra response có chứa danh sách lỗi validation hay không
      if (typeof body === 'object' && body !== null) {
        const errors =
          'errors' in body &&
          typeof body.errors === 'object' &&
          body.errors !== null &&
          !Array.isArray(body.errors)
            ? body.errors
            : null;

        if (errors) {
          return {
            success: false,
            error_code:
              'error_code' in body && typeof body.error_code === 'number'
                ? body.error_code
                : ErrorCode.VALIDATION_ERROR,
            error_message:
              'message' in body && typeof body.message === 'string'
                ? body.message
                : 'Validation failed',
            data: errors,
          };
        }
      }
    }

    // 3. Xử lý các HTTP exception khác như 400, 401, 403, 404, 409...
    if (exception instanceof HttpException) {
      return {
        success: false,
        error_code: this.getErrorCode(exception.getStatus()),
        error_message: this.getHttpErrorMessage(exception),
        data: null,
      };
    }

    // 4. Xử lý các exception không xác định hoặc lỗi ngoài dự kiến
    return {
      success: false,
      error_code: ErrorCode.INTERNAL_SERVER_ERROR,
      error_message: 'Internal server error',
      data: null,
    };
  }

  /**
   * Chuyển đổi HTTP status thành mã lỗi tương ứng của ứng dụng.
   */
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

  /**
   * Lấy thông báo lỗi an toàn từ HttpException.
   * Không trả về các thông tin kỹ thuật nội bộ của server.
   */
  private getHttpErrorMessage(exception: HttpException): string {
    const exceptionResponse = exception.getResponse();

    // Trường hợp response là một chuỗi
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    // Trường hợp response là object có thuộc tính message
    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      const message = exceptionResponse.message;

      if (typeof message === 'string') {
        return message;
      }

      // Không trả trực tiếp mảng message mặc định của NestJS
      if (Array.isArray(message)) {
        return 'Request validation failed';
      }
    }

    return 'HTTP request failed';
  }

  /**
   * Ghi log exception để hỗ trợ theo dõi và debug hệ thống.
   *
   * - Lỗi 4xx: sử dụng warn vì thường liên quan đến request từ client.
   * - Lỗi 5xx: sử dụng error và ghi thêm stack trace để điều tra.
   */
  private logException(
    exception: unknown,
    request: Request,
    statusCode: number,
  ): void {
    const message = `${request.method} ${request.originalUrl} - ${statusCode}`;

    // Lỗi server cần ghi lại stack trace để tìm nguyên nhân
    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        message,
        exception instanceof Error ? exception.stack : String(exception),
      );

      return;
    }

    // Lỗi phía client chỉ ghi thông tin request và HTTP status
    this.logger.warn(message);
  }
}
