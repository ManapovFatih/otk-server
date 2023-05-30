import { ApiProperty } from '@nestjs/swagger';
import { AreaHouse } from '@prisma/client';

export class AreaHouseEntity implements AreaHouse {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'до 20 кв. м.',
  })
  area: string;
}
