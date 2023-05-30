import { ApiProperty } from '@nestjs/swagger';
import { TypeHouse } from '@prisma/client';

export class TypeHouseEntity implements TypeHouse {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Квартира',
  })
  name: string;

  @ApiProperty({
    example: 'products/asd9f91asf-img1.png',
  })
  image: string;
}
