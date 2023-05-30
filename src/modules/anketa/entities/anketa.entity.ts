import { ApiProperty } from '@nestjs/swagger';
import { Anketa } from '@prisma/client';

export class AnketaEntity implements Anketa {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  typeId: number;

  @ApiProperty({
    example: 1,
  })
  areaId: number;

  @ApiProperty({
    example: 1,
  })
  productId: number;

  @ApiProperty({
    example: '+71234567890',
  })
  phone: string;

  @ApiProperty({
    example: 'Иван',
  })
  name: string;
}
