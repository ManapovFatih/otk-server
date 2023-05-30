import { ImageService } from './../file/image.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService, private readonly imageService: ImageService) {}

  async create(createCategoryDto: CreateCategoryDto, image: Express.Multer.File) {
    const { ...createDto } = createCategoryDto;
    const filename = await this.imageService.updateImage(image, 'categories');
    return await this.prismaService.category.create({
      data: { ...createDto, image: filename },
    });
  }

  async findById(id: number) {
    return await this.prismaService.category.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  async findAll() {
    return await this.prismaService.category.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async delete(id: number) {
    const deletedCategory = await this.prismaService.category.delete({
      where: {
        id: id,
      },
    });
    if (deletedCategory.image && deletedCategory.image != '') {
      await this.imageService.deleteImage(deletedCategory.image);
    }
    return deletedCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, image: Express.Multer.File) {
    const category = await this.findById(id);
    const { setImageToNull, ...createDto } = updateCategoryDto;
    const filename = await this.imageService.updateImage(image, 'categories', category.image, setImageToNull);
    return await this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        ...createDto,
        image: filename,
      },
    });
  }
}
