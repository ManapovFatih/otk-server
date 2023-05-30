import { ProductEntity } from './product.entity';
import { PaginationResult } from '../../../base/paginationResult/paginationResult';
import { ApiProperty } from '@nestjs/swagger';

export class ProductPaginationResultEntity extends PaginationResult<ProductEntity> {
  @ApiProperty({
    example: 10,
  })
  minPrice: number;

  @ApiProperty({
    example: 50,
  })
  maxPrice: number;
  @ApiProperty({
    example: 50,
  })
  prevPage: number;

  @ApiProperty({
      example: 50,
  })
  currentPage: number;

  @ApiProperty({
      example: 50,
  })
  nextPage: number;

  @ApiProperty({
      example: 50,
  })
  lastPage: number;
}
