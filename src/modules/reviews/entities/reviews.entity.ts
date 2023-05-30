import { ApiProperty } from '@nestjs/swagger';
import { Reviews } from '@prisma/client';

export class ReviewsEntity implements Reviews {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 5,
  })
  count: number;

  @ApiProperty({
    example: 'Оличный',
  })
  description: string;
}
