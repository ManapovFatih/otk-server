import { ApiProperty } from '@nestjs/swagger';
import { News } from '@prisma/client';

export class NewsEntity implements News {
  @ApiProperty({
    example: 1,
    description: 'Id of a news',
  })
  id: number;

  @ApiProperty({
    example: 'news/asdfasdasfg-img1.png',
    description: 'Path to image',
  })
  image: string;

  @ApiProperty({
    example: true,
    description: 'Should show on site?',
  })
  isShowing: boolean;

  @ApiProperty({
    example: 'Today i have ate a banana',
    description: 'Description of a news',
  })
  title: string;

  @ApiProperty({
    example: 'Today i have ate a banana',
    description: 'Description of a news',
  })
  description: string;

  @ApiProperty({
    example: '2023-03-22 08:50:01.93',
    description: 'When news was created',
  })
  createdAt: Date;
}
  