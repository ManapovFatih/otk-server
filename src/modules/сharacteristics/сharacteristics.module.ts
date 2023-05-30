import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { СharacteristicsService } from './сharacteristics.service';
import { СharacteristicsController } from './сharacteristics.controller';

@Module({
  providers: [СharacteristicsService],
  controllers: [СharacteristicsController],
  exports: [СharacteristicsService],
  imports: [DatabaseModule, AuthModule],
})
export class СharacteristicsModule {}
