import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetBrandsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  // @Max(8) //Commented because sometimes it's needed to fetch all ones
  limit?: number = 10;

  @IsOptional()
  @IsString()
  brand?: string;
}
