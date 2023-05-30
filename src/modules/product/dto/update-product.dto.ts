import { Transform, Type } from '@nestjs/class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateIf } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Royal Clima GLORIA 2022',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    example: ['Image from Form-Data 1', 'Image from Form-Data 2'],
    description: 'Images of product',
    required: false,
  })
  @IsOptional()
  images: Express.Multer.File[];

	@ApiProperty({
    example: '12000 БТЕ',
  })
	@IsOptional()
	@IsString()
  models: string;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    example: [1, 2],
    required: false,
  })
	@IsOptional()
	@IsArray()
  characteristicsIds: string[];

  @ApiProperty({
    example: false,
    description: 'If true, setting image to null, else default behaviour',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  setImageToNull: boolean;

  @ApiProperty({
    example: 'Сплит-системы серии GLORIA Inverter',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: 12344321,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  article: number;

  @ApiProperty({
    example: 890,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({
    example: [1, 2],
    required: false,
  })
  @IsOptional()
  @IsArray()
  specificationIds: string[];

  @ApiProperty({
    example: [1, 2, 4, 5],
    required: false,
  })
  @IsOptional()
  @IsArray()
  optionIds: string[];

	@ApiProperty({
    example: [1, 2, 4, 5],
    required: false,
  })
  @IsOptional()
  @IsArray()
	affinityIds: string[];
}
