import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface ApiResponsePayload<T> {
  data: T;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  error_code: number;
  error_message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T | ApiResponsePayload<T>,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T | ApiResponsePayload<T>>,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((result) => {
        console.log(result);
        const isPayload = typeof result === 'object' && result !== null;

        const payload = isPayload
          ? (result as ApiResponsePayload<T>)
          : { data: result };

        console.log(payload);

        return {
          success: true,
          error_code: 0,
          error_message: payload.message ?? 'Success',
          data: payload.data,
        };
      }),
    );
  }
}
