import { ApiProperty } from '@nestjs/swagger';

export class SettingsEntity {
  @ApiProperty({
    example: 2,
  })
  id: number;

  @ApiProperty({ example: 'OOO OTK-service' })
  legalStatus: string;

  @ApiProperty({
    example: 'Kazan',
  })
  address: string;

  @ApiProperty({
    example: '+712345678990',
  })
  phone: string;
}
