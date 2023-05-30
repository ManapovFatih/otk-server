import { ProductPaginationResultEntity } from './entities/product-pagination-result.entity';
import { PaginateProductsDto } from './dto/paginate-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetProductsByIdsDto } from './dto/products-get-by-ids.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Paginate products' })
  @ApiOkResponse({
    type: ProductPaginationResultEntity,
  })
  @Get('paginate')
  async paginate(@Query() paginateProductsDto: PaginateProductsDto) {
    return await this.productService.paginate(paginateProductsDto);
  }

  @ApiOperation({ summary: 'Get products by array of ids' })
  @ApiOkResponse({
    type: [ProductEntity],
  })
  @Get('byIds')
  async getByIds(@Query() getProductsByIdsDto: GetProductsByIdsDto) {
		const ids: number[] = JSON.parse(getProductsByIdsDto.ids);
    return await this.productService.findByIds(ids);
  }

  @ApiOperation({ summary: 'Get product' })
  @ApiOkResponse({
    type: ProductEntity,
  })
  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findById(id);
  }

  @ApiOperation({ summary: 'Get with params preloads' })
  @ApiOkResponse({
    type: ProductEntity,
  })
  @Get('/withParameters/:id')
  async getWithParams(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findByIdWithPreloads(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create product' })
  @ApiOkResponse({
    type: ProductEntity,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  @Post()
  async create(@UploadedFiles() images: Express.Multer.File[], @Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto, images);
  }

  @ApiOperation({ summary: 'Find product' })
  @ApiOkResponse({
    type: [ProductEntity],
  })
  @Get('search')
  async find(@Query() findProductDto: FindProductDto) {
    return await this.productService.search(findProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update product' })
  @ApiOkResponse({
    type: ProductEntity,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() images: Express.Multer.File[],
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(id, updateProductDto, images);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete product by id' })
  @ApiOkResponse({
    type: ProductEntity,
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.delete(id);
  }  
}
