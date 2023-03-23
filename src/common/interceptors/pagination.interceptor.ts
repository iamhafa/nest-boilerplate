import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';
import { EDefaultPagination } from '../types/default-pagination.enum';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest();

        const page = Number(request.query.page) || EDefaultPagination.page;
        const total = Number(request.query.limit) || EDefaultPagination.limit;

        // binding extra logic to response (wrap response into `data` key)
        return next
            .handle()
            .pipe(map((dataResponse) => ({ data: dataResponse, currentPage: page, totalRecord: total })));
    }
}
