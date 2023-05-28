import { IsNotIn, IsOptional, IsString } from 'class-validator';
import { ForbiddenQuery } from 'src/common/shared/forbidden.query';

export class FilterUserDto {
  @IsString()
  @IsOptional()
  @IsNotIn(ForbiddenQuery)
  username?: string;
}
