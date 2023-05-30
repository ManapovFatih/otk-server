import { Transform, Type } from '@nestjs/class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, ValidateIf } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Royal Clima GLORIA 2022',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Article of a product',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  article: number;

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
    example: false,
    description: 'If true, setting image to null, else default behaviour',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  setImageToNull: boolean;

  @ApiProperty({
    example: 30200,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    example: 'Сплит-системы серии GLORIA Inverter',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

	@ApiProperty({
    example: '12000 БТЕ',
  })
	@IsOptional()
	@IsArray()
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
