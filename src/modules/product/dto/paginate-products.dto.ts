import { Product } from '@prisma/client';
import { PaginationConfig } from './../../../base/paginationConfig';
import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/class-transformer';

export class PaginateProductsDto extends PaginationConfig<Product> {
  @ApiProperty({
    required: false,
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsString()
  options: string;

  @ApiProperty({
    required: false,
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsString()
  specifications: string;

  @ApiProperty({
    required: false,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice: number;

  @ApiProperty({
    required: false,
    example: 50,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice: number;

  @ApiProperty({
  required: false,
      example: 50,
  })
  @IsOptional()
  @IsNumber()
  categoryId: number;
}
