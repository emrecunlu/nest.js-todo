import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationDto {
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  page?: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number;
}
