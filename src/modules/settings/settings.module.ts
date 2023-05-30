import { AuthModule } from './../auth/auth.module';
import { SettingsService } from './settings.service';
import { SettingsController } from './setttings.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [SettingsService],
  controllers: [SettingsController],
  exports: [],
  imports: [DatabaseModule, AuthModule],
})
export class SettingsModule {}
