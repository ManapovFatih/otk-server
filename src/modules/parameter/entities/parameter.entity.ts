import { ApiProperty } from '@nestjs/swagger';
import { Parameter } from '@prisma/client';

export class ParameterEntity implements Parameter {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Вязкость',
  })
  name: string;

  @ApiProperty({
    example: 1,
  })
  categoryId: number | null;
}
