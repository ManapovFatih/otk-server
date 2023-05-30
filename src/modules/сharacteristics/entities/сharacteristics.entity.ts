import { ApiProperty } from '@nestjs/swagger';
import { Characteristics } from '@prisma/client';

export class CharacteristicsEntity implements Characteristics {
  @ApiProperty({
    example: 1,
  })
  id: number;
  
  @ApiProperty({
    example: 'Тип',
  })
  name: string;

  @ApiProperty({
    example: 'Сплит-система',
  })
  value: string;
}
