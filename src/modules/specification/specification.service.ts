import { CreateSpecificationDto } from './dto/create-specification.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SpecificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSpecificationDto: CreateSpecificationDto) {
    return await this.prismaService.specification.create({
      data: { ...createSpecificationDto },
    });
  }

  async findById(id: number) {
    return await this.prismaService.specification.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async findByCategoryId(categoryId: number) {
    return await this.prismaService.specification.findMany({
      where: {
        categoryId,
      },
    });
  }

  async findByProductId(productId: number) {
    return await this.prismaService.specification.findMany({
      where: {
        productOnSpecification: {
          some: {
            productId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prismaService.specification.findMany();
  }

  async delete(id: number) {
    await this.prismaService.specification.delete({
      where: {
        id,
      },
    });
  }
}
