import { Transform } from '@nestjs/class-transformer';
import { IsBoolean, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateNewsDto {
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
    required: false,
  })
	@IsBoolean()
  @Transform(({ value }) => value == 'true')
  @IsOptional()
  isShowing: boolean;


  @ApiProperty({
    example: 'Что нужно знать перед установкой кондиционера?',
    description: 'Title of a news',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, est laborum et dolorum fuga.',
    description: 'Description of a news',
  })
  @IsString()
  description: string;
}
