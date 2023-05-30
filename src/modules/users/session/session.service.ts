import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';
import { PrismaService } from '../../../modules/database/prisma.service';
import { Token } from '../../../interfaces/Token.interface';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionService {
  constructor(private prismaService: PrismaService) {}

  async findOneByRefreshToken(refreshToken: Token): Promise<Session> {
    const result = await this.prismaService.session.findFirstOrThrow({
      where: {
        refreshToken: refreshToken,
      },
    });
    return result;
  }

  async deleteSessionByRefreshToken(refreshToken: Token): Promise<Session> {
    const result = await this.prismaService.session.delete({
      where: {
        refreshToken: refreshToken,
      },
    });
    return result;
  }

  async create(userId: number, createSessionDto: CreateSessionDto): Promise<Session> {
    const result = await this.prismaService.session.create({
      data: {
        userId,
        ...createSessionDto,
      },
    });
    return result;
  }

  async upsertSessionByFingerPrint(userId: number, createSessionDto: CreateSessionDto): Promise<Session> {
    const result = await this.prismaService.session.upsert({
      where: {
        fingerprint: createSessionDto.fingerprint,
      },
      update: {
        refreshToken: createSessionDto.refreshToken,
        expiresAt: createSessionDto.expiresAt,
      },
      create: {
        userId,
        ...createSessionDto,
      },
    });
    return result;
  }
}
