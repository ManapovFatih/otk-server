import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecificationDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    example: 'Фильтр',
  })
  @IsString()
  name: string;
}
