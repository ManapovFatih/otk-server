import { FileModule } from './../file/file.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
  imports: [DatabaseModule, FileModule, AuthModule],
})
export class CategoryModule {}
