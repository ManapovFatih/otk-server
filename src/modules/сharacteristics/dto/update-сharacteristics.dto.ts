import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCharacteristicsDto {
  @ApiProperty({
    example: 'Тип',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Сплит-система',
  })
  @IsOptional()
  @IsString()
  value: string;
}