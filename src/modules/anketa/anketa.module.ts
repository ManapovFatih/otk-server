import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { AnketaService } from './anketa.service';
import { AnketaController } from './anketa.controller';

@Module({
  providers: [AnketaService],
  controllers: [AnketaController],
  exports: [AnketaService],
  imports: [DatabaseModule, AuthModule],
})
export class AnketaModule {}
