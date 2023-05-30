import { UpdateNewsDto } from './dto/update-news.dto';
import { ImageService } from './../file/image.service';
import { PaginateNewsDto } from './dto/paginate-news.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class NewsService {
  constructor(private prismaService: PrismaService, private imageService: ImageService) {}
  async create(userId: number, createNewsDto: CreateNewsDto, image: Express.Multer.File) {
    let filename = '';
    filename = await this.imageService.updateImage(image, 'news');
    return await this.prismaService.news.create({
      data: {
        ...createNewsDto,
        image: filename,
      },
    });
  }

  async update(id: number, updateNewsDto: UpdateNewsDto, image: Express.Multer.File) {
    const newsBeforeUpdate = await this.prismaService.news.findFirstOrThrow({
      where: { id },
    });
    let filename = newsBeforeUpdate.image;
    const { setImageToNull, ...updateData } = updateNewsDto;
    filename = await this.imageService.updateImage(image, 'news', filename, setImageToNull);
    return await this.prismaService.news.update({
      where: {
        id,
      },
      data: {
        ...updateData,
        image: filename,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.news.findFirstOrThrow({ where: { id } });
  }

  async delete(id: number) {
    const deletedNews = await this.prismaService.news.delete({
      where: { id },
    });
    if (deletedNews.image && deletedNews.image != '') {
      await this.imageService.deleteImage(deletedNews.image);
    }
    return deletedNews;
  }

  async paginate(paginateNewsDto: PaginateNewsDto) {
    const key = paginateNewsDto.orderBy;
    const direction = paginateNewsDto.direction;
    // need a typings here
    const orderObject = {};
    const whereObject = {};
    orderObject[key] = direction;

    const count = await this.prismaService.news.count({
      where: whereObject,
    });
    const body = await this.prismaService.news.findMany({
      skip: +paginateNewsDto.limit * (paginateNewsDto.page - 1),
      take: +paginateNewsDto.limit,
      orderBy: orderObject,
      where: whereObject,
    });
    return {
      meta: {
        total: count,
      },
      body,
    };
  }
}
