import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateСharacteristicsDto } from './dto/create-сharacteristics.dto';
import { UpdateCharacteristicsDto } from './dto/update-сharacteristics.dto';

@Injectable()
export class СharacteristicsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createСharacteristicsDto: CreateСharacteristicsDto) {
    const { ...createDto } = createСharacteristicsDto;
    return await this.prismaService.characteristics.create({
      data: { ...createDto},
    });
  }

  async findById(id: number) {
    return await this.prismaService.characteristics.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  async findAll() {
    return await this.prismaService.characteristics.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async delete(id: number) {
    return await this.prismaService.characteristics.delete({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateСharacteristicsDto: UpdateCharacteristicsDto) {
    const сharacteristics = await this.findById(id);
    const {...createDto } = updateСharacteristicsDto;
    return await this.prismaService.characteristics.update({
      where: {
        id,
      },
      data: {
        ...createDto,
      },
    });
  }
}
