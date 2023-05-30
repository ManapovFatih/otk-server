import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAreaHouseDto } from './dto/create-areaHouse.dto';
import { UpdateAreaHouseDto } from './dto/update-areaHouse.dto';

@Injectable()
export class AreaHouseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAreaHouseDto: CreateAreaHouseDto) {
    const { ...createDto } = createAreaHouseDto;
    return await this.prismaService.areaHouse.create({
      data: { ...createDto},
    });
  }

  async findById(id: number) {
    return await this.prismaService.areaHouse.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  async findAll() {
    return await this.prismaService.areaHouse.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async delete(id: number) {
    return await this.prismaService.areaHouse.delete({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateAreaHouseDto: UpdateAreaHouseDto) {
    const areaHouse = await this.findById(id);
    const {...createDto } = updateAreaHouseDto;
    return await this.prismaService.areaHouse.update({
      where: {
        id,
      },
      data: {
        ...createDto,
      },
    });
  }
}
