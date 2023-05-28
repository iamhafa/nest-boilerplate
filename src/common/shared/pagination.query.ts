import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { PAGINATION } from 'src/common/constants';

export class PaginationQuery {
  @IsOptional()
  // convert string query to number & only accept number type
  @Type(() => Number)
  @IsNumber()
  @Min(PAGINATION.PAGE)
  page?: number = PAGINATION.PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Max(PAGINATION.LIMIT)
  limit?: number = PAGINATION.LIMIT;
}
