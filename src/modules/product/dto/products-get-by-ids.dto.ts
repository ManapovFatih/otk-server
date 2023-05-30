import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetProductsByIdsDto {
  @ApiProperty({
    example: [1, 2, 3, 5],
  })
  @IsString()
  ids: string;
}
