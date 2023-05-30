import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewsDto {
  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  count: number;

  @ApiProperty({
    example: 'Оличный',
  })
  @IsOptional()
  @IsString()
  description: string;
}
