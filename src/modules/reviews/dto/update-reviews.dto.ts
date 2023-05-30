import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReviewsDto {
  @ApiProperty({
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  count: number;

  @ApiProperty({
    example: 'Оличный',
  })
  @IsOptional()
  @IsString()
  description: string;
}