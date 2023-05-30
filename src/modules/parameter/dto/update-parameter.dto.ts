import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateParameterDto {
  @ApiProperty({
    example: 'Тип',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
