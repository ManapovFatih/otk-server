import { News } from '@prisma/client';
import { IsNumber, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationConfig } from '../../../base/paginationConfig';

export class PaginateNewsDto extends PaginationConfig<News> {}
