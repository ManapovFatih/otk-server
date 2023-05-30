import { Transform } from '@nestjs/class-transformer';
import { IsBoolean, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTypeHouseDto {
  @ApiProperty({
    example: 'Квартира',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    example: 'Image from Form-Data',
    description: 'Image of an event',
    required: false,
  })
  @IsOptional()
  image: Express.Multer.File;

  @ApiProperty({
    example: false,
    description: 'If true, setting image to null, else default behaviour',
  })
  @IsOptional()
	@Transform(({ value }) => value === 'true')
  @IsBoolean()
  setImageToNull: boolean;
}
