import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from '@nestjs/class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email of user, unique ',
  })
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Must be email' })
  readonly email: string;

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
    example: 'asdf_1s!@41$#afafg9',
    description: 'Password. Stored in hased form',
  })
  @IsString({ message: 'Must be string' })
  @Length(8, 24, {
    message: 'Can not be shorter than 8 symbols',
  })
  readonly password: string;
}
