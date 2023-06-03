import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { RESULTS } from 'src/utils/constants';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((dataResponse) => ({
        results: RESULTS.OK,
        dataPart: dataResponse,
      })),
    );
  }
}
