import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingsDto {
  @ApiProperty({ example: 'OOO OTK-service' })
  @IsString()
  legalStatus: string;

  @ApiProperty({
    example: 'Kazan',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: '+712345678990',
  })
  @IsString()
  phone: string;
}
