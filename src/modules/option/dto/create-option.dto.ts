import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionDto {
  @ApiProperty({
    example: 'Настенный',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  parameterId: number;
}
