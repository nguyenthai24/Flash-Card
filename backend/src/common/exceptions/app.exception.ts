import { HttpException } from '@nestjs/common';

import { ErrorCode } from '@/common/constants/error-code.constant';

export class AppException extends HttpException {
  constructor(
    public readonly errorCode: ErrorCode,
    message: string,
    statusCode: number,
  ) {
    super(message, statusCode);
  }
}
