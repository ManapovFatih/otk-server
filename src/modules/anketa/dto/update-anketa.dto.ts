import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnketaDto {
  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  typeId: number;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  areaId: number;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  productId: number;

  @ApiProperty({
    example: '+71234567890',
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Иван',
  })
  @IsOptional()
  @IsString()
  name: string;
}