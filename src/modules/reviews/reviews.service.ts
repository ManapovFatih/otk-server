import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateReviewsDto } from './dto/create-reviews.dto';
import { UpdateReviewsDto } from './dto/update-reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReviewsDto: CreateReviewsDto) {
    const { ...createDto } = createReviewsDto;
    return await this.prismaService.reviews.create({
      data: { ...createDto},
    });
  }

  async findById(id: number) {
    return await this.prismaService.reviews.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  async findAll() {
    return await this.prismaService.reviews.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async delete(id: number) {
    return await this.prismaService.reviews.delete({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateReviewsDto: UpdateReviewsDto) {
    const category = await this.findById(id);
    const {...createDto } = updateReviewsDto;
    return await this.prismaService.reviews.update({
      where: {
        id,
      },
      data: {
        ...createDto,
      },
    });
  }
}
