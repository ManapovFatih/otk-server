import { PrismaService } from '../../modules/database/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
