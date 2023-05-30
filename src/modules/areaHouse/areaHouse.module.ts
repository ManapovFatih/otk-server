import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { AreaHouseService } from './areaHouse.service';
import { AreaHouseController } from './areaHouse.controller';

@Module({
  providers: [AreaHouseService],
  controllers: [AreaHouseController],
  exports: [AreaHouseService],
  imports: [DatabaseModule, AuthModule],
})
export class AreaHouseModule {}
