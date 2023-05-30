import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsEntity } from './entities/news.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginateNewsDto } from './dto/paginate-news.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaginationResult } from '../../base/paginationResult/paginationResult';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'Paginate news' })
  @ApiOkResponse({
    type: PaginationResult<NewsEntity>,
  })
  @Get('paginate')
  async paginate(@Query() paginateNewsDto: PaginateNewsDto) {
    return await this.newsService.paginate(paginateNewsDto);
  }

  @ApiOperation({ summary: 'Get one news' })
  @ApiOkResponse({
    type: NewsEntity,
  })
  @Get(':id')
  async getOneById(@Param('id') id: string) {
    return await this.newsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create news' })
  @ApiOkResponse({
    type: NewsEntity,
  })
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async createNews(
    @UploadedFile() image: Express.Multer.File,
    @Body() createNewsDto: CreateNewsDto,
    @Req() request: Request,
  ) {
    return await this.newsService.create(request.user.id, createNewsDto, image);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Edit news' })
  @ApiOkResponse({
    type: NewsEntity,
  })
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async editNews(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() image: Express.Multer.File,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    return await this.newsService.update(id, updateNewsDto, image);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete news by id' })
  @ApiOkResponse({
    type: NewsEntity,
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.newsService.delete(+id);
  }
}
