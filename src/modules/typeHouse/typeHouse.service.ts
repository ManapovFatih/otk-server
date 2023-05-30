import { ImageService } from '../file/image.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTypeHouseDto } from './dto/create-typeHouse.dto';
import { UpdateTypeHouseDto } from './dto/update-typeHouse.dto';

@Injectable()
export class TypeHouseService {
  constructor(private readonly prismaService: PrismaService, private readonly imageService: ImageService) {}

  async create(createTypeHouseDto: CreateTypeHouseDto, image: Express.Multer.File) {
    const { ...createDto } = createTypeHouseDto;
    const filename = await this.imageService.updateImage(image, 'typeHouses');
    return await this.prismaService.typeHouse.create({
      data: { ...createDto, image: filename },
    });
  }

  async findById(id: number) {
    return await this.prismaService.typeHouse.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  async findAll() {
    return await this.prismaService.typeHouse.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async delete(id: number) {
    const deletedTypeHouse = await this.prismaService.typeHouse.delete({
      where: {
        id: id,
      },
    });
    if (deletedTypeHouse.image && deletedTypeHouse.image != '') {
      await this.imageService.deleteImage(deletedTypeHouse.image);
    }
    return deletedTypeHouse;
  }

  async update(id: number, updateTypeHouseDto: UpdateTypeHouseDto, image: Express.Multer.File) {
    const typeHouse = await this.findById(id);
    const { setImageToNull, ...createDto } = updateTypeHouseDto;
    const filename = await this.imageService.updateImage(image, 'typeHouses', typeHouse.image, setImageToNull);
    return await this.prismaService.typeHouse.update({
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
