import { AuthModule } from './../auth/auth.module';
import { SpecificationController } from './spectification.controller';
import { SpecificationService } from './specification.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [SpecificationService],
  controllers: [SpecificationController],
  exports: [SpecificationService],
  imports: [DatabaseModule, AuthModule],
})
export class SpecificationModule {}
