import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParameterDto {
  @ApiProperty({
    example: 'Тип',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
