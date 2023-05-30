import { UpdateParameterDto } from './dto/update-parameter.dto';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
@Injectable()
export class ParameterService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createParameterDto: CreateParameterDto) {
    return await this.prismaService.parameter.create({
      data: createParameterDto,
    });
  }

  async update(id: number, updateParameterDto: UpdateParameterDto) {
    return await this.prismaService.parameter.update({
      data: updateParameterDto,
      where: {
        id,
      },
    });
  }

  async findByCategoryId(categoryId: number, withOptions = false) {
    const whereObject = {
      OR: [
        {
          categoryId: categoryId,
        },
        {
          categoryId: null,
        },
      ],
    };

    return await this.prismaService.parameter.findMany({
      where: whereObject,
      include: {
        options: withOptions,
      },
    });
  }
  async findByProductId(productId: number) {
    return await this.prismaService.parameter.findMany({
      where: {
        options: {
          some: {
            productOnOption: {
              some: {
                productId: productId,
              },
            },
          },
        },
      },
      include: {
        options: {
          where: {
            productOnOption: {
              some: {
                productId,
              },
            },
          },
        },
      },
    });
  }

  async findCommon() {
    return await this.prismaService.parameter.findMany({
      where: {
        categoryId: null,
      },
    });
  }

  async findById(id: number) {
    return await this.prismaService.parameter.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  async findAll() {
    return await this.prismaService.parameter.findMany();
  }

  async delete(id: number) {
    return await this.prismaService.parameter.delete({
      where: {
        id,
      },
    });
  }
}
