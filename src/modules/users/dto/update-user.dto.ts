import { Transform } from '@nestjs/class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email of user',
  })
  @IsEmail()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({
    example: false,
    description: 'If true, setting user image to null, else default behaviour',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  setImageToNull: boolean;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    example: 'Image from Form-Data',
    description: 'Image of a user',
    required: false,
  })
  @IsOptional()
  image: Express.Multer.File;
}
