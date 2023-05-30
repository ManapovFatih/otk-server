import { FileModule } from './../file/file.module';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [DatabaseModule, AuthModule, FileModule],
})
export class NewsModule {}
