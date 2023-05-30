import { CreateSettingsDto } from './dto/create-settings.dto';
import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}
  async find(id: number) {
    return await this.prismaService.settings.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async upsert(id: number, createSettingsDto: CreateSettingsDto) {
    return await this.prismaService.settings.upsert({
      where: {
        id,
      },
      update: {
        ...createSettingsDto,
      },
      create: {
        ...createSettingsDto,
      },
    });
  }
}
