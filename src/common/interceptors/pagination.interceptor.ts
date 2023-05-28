import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';
import { PAGINATION } from 'src/common/constants';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    // get offset & limit from query string
    const { page, limit } = request.query;

    // binding extra logic to response (wrap response into `data` key)
    return next.handle().pipe(
      map((dataResponse: object[]) => ({
        listArray: dataResponse,
        currentPage: Number(page) || PAGINATION.PAGE,
        totalRecord: Number(limit) || PAGINATION.LIMIT,
      })),
    );
  }
}
