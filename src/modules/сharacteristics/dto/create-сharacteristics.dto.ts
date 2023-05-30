import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateСharacteristicsDto {
  @ApiProperty({
    example: 'Тип',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Сплит-система',
  })
  @IsString()
  value: string;
}
