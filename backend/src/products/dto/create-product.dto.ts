/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  slug: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsPositive()
  price: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsPositive()
  @IsOptional()
  discountPrice?: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @IsOptional()
  brandId?: string;

  @IsString()
  categoryId: string;

  @IsString()
  typeId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  details?: string;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @IsString({ each: true })
  sizes?: string[];

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value).map((x) => parseInt(x, 10)))
  @IsArray()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  sizesStock?: number[]; //This array contains respective stock for every size. Same length that sizes[]

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value).map((x) => parseInt(x, 10)))
  @IsArray()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  colorsStock?: number[]; //This array contains respective stock for every color. Same length that colors[]
}
