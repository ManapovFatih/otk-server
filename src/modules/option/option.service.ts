import { UpdateOptionDto } from './dto/update-option.dto';
import { CreateOptionDto } from './dto/create-option.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
@Injectable()
export class OptionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOptionDto: CreateOptionDto) {
    return await this.prismaService.option.create({
      data: createOptionDto,
    });
  }

  async update(id: number, updateOptionDto: UpdateOptionDto) {
    return await this.prismaService.option.update({
      data: updateOptionDto,
      where: {
        id,
      },
    });
  }

  async findByParameterId(parameterId: number) {
    return await this.prismaService.option.findMany({
      where: {
        parameterId,
      },
    });
  }

  async findById(id: number) {
    return await this.prismaService.option.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        parameter: true,
      },
    });
  }

  async findAll() {
    return await this.prismaService.option.findMany({
      include: {
        parameter: true,
      },
    });
  }

  async delete(id: number) {
    await this.prismaService.option.delete({
      where: {
        id,
      },
    });
  }
}
