import { ApiProperty } from '@nestjs/swagger';

export class OptionEntity {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: '10W-60',
  })
  name: string;

  @ApiProperty({
    example: 1,
  })
  parameterId: number;
}
