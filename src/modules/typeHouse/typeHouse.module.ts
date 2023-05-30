import { FileModule } from '../file/file.module';
import { TypeHouseController } from './typeHouse.controller';
import { TypeHouseService } from './typeHouse.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [TypeHouseService],
  controllers: [TypeHouseController],
  exports: [TypeHouseService],
  imports: [DatabaseModule, FileModule, AuthModule],
})
export class TypeHouseModule {}
