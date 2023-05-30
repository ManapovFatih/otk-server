import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAreaHouseDto {
  @ApiProperty({
    example: 'до 20 кв. м.',
  })
  @IsOptional()
  @IsString()
  area: string;
}