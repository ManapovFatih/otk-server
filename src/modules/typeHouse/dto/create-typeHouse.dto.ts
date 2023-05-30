import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeHouseDto {
  @ApiProperty({
    example: 'Квартира',
  })
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
}
