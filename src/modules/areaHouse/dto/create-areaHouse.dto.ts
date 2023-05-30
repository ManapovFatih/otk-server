import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaHouseDto {
  @ApiProperty({
    example: 'до 20 кв. м.',
  })
  @IsString()
  area: string;
}
