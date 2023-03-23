import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { EDefaultPagination } from '../types/default-pagination.enum';

export class PaginationQuery {
    @IsOptional()
    // convert string query to number & only accept number type
    @Type(() => Number)
    @IsNumber()
    @Min(EDefaultPagination.page)
    page?: number = EDefaultPagination.page;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Max(EDefaultPagination.limit)
    limit?: number = EDefaultPagination.limit;
}
