import { FileModule } from './../file/file.module';
import { SessionService } from './session/session.service';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ImageService } from '../file/image.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController ],
  providers: [UsersService, SessionService, ImageService],
  exports: [UsersService, SessionService],
  imports: [DatabaseModule, AuthModule, FileModule],
})
export class UsersModule {}
