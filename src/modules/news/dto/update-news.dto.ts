import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from '@nestjs/class-validator';
import { Transform, Type } from '@nestjs/class-transformer';

export class UpdateNewsDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    example: 'Image from Form-Data',
    description: 'Image of a news',
    required: false,
  })
  @IsOptional()
  image: Express.Multer.File;

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
    example: true,
    description: 'Should show on site?',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isShowing: boolean;

  @ApiProperty({
    example: 'Today i have ate a banana',
    description: 'Description of a news',
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Today i have ate a banana',
    description: 'Description of a news',
  })
  @IsOptional()
  @IsString()
  description: string;
}
