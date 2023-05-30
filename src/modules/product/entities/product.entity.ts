import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductEntity implements Product {
	
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Royal Clima GLORIA 2022',
  })
  name: string;

	@ApiProperty({
    example: '12000 БТЕ',
  })
  models: string[];

  @ApiProperty({
    example: 1,
  })
  categoryId: number;

  @ApiProperty({
    example: 890,
  })
  price: number;

  @ApiProperty({
    example: 3630477,
  })
  article: number;

  @ApiProperty({
    example: 'products/asd9f91asf-img1.png',
  })
  images: string[];

  @ApiProperty({
    example: 'Сплит-системы серии GLORIA Inverter',
  })
  description: string;

	@ApiProperty({
    type: [ProductEntity]
  })
	affinities: ProductEntity[]
}
