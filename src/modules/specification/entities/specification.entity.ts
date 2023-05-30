import { ApiProperty } from '@nestjs/swagger';

export class SpecificationEntity {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 1,
  })
  categoryId: number;
  @ApiProperty({
    example: 'Фильтр',
  })
  name: string;
}
