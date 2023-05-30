import { ImageService } from './image.service';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
  controllers: [],
  providers: [FileService, ImageService],
  imports: [DatabaseModule],
  exports: [ImageService, FileService],
})
export class FileModule {}
