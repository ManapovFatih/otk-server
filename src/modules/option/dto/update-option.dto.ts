import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOptionDto {
  @ApiProperty({
    example: 'Настенный',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  parameterId: number;
}
