import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
  imports: [DatabaseModule, AuthModule],
})
export class ReviewsModule {}
