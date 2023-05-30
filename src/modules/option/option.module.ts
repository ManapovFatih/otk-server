import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [OptionService],
  controllers: [OptionController],
  exports: [OptionService],
  imports: [DatabaseModule, AuthModule],
})
export class OptionModule {}
