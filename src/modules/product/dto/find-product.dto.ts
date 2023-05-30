import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindProductDto {
  @ApiProperty({
    example: 'Royal Clima GLORIA 2022',
  })
  @IsString()
  query: string;
}
