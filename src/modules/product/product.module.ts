import { CategoryModule } from './../category/category.module';
import { SpecificationModule } from './../specification/specification.module';
import { ParameterModule } from './../parameter/parameter.module';
import { FileModule } from './../file/file.module';
import { ProductService } from './product.service';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
  imports: [DatabaseModule, FileModule, AuthModule, ParameterModule, SpecificationModule, CategoryModule],
})
export class ProductModule {}
