import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAnketaDto } from './dto/create-anketa.dto';
import { UpdateAnketaDto } from './dto/update-anketa.dto';

@Injectable()
export class AnketaService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAnketaDto: CreateAnketaDto) {
    const { ...createDto } = createAnketaDto;
    return await this.prismaService.anketa.create({
      data: { ...createDto,},
    });
  }
  
  async findById(id: number) {
    return await this.prismaService.anketa.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  async findAll() {
    return await this.prismaService.anketa.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async delete(id: number) {
    return await this.prismaService.anketa.delete({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateAnketaDto: UpdateAnketaDto) {
    const anketa = await this.findById(id);
    const {...createDto } = updateAnketaDto;
    return await this.prismaService.anketa.update({
      where: {
        id,
      },
      data: {
        ...createDto,
      },
    });
  }
}
