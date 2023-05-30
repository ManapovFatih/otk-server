import { ParameterService } from './parameter.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ParameterController } from './parameter.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ParameterService],
  controllers: [ParameterController],
  exports: [ParameterService],
  imports: [DatabaseModule, AuthModule],
})
export class ParameterModule {}
