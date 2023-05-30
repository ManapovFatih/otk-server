import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReviewsEntity } from './entities/reviews.entity';
import { CreateReviewsDto } from './dto/create-reviews.dto';
import { UpdateReviewsDto } from './dto/update-reviews.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({ summary: 'Get one by id' })
  @ApiOkResponse({
    type: ReviewsEntity,
  })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: string) {
    return await this.reviewsService.findById(+id);
  }

  @ApiOperation({ summary: 'Get all reviews' })
  @ApiOkResponse({
    type: [ReviewsEntity],
  })
  @Get()
  async getAll() {
    return await this.reviewsService.findAll();
  }

  @ApiOperation({ summary: 'Create reviews' })
  @ApiCreatedResponse({
    type: ReviewsEntity,
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  async create(@Body() createReviewsDto: CreateReviewsDto) {
    return await this.reviewsService.create(createReviewsDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update reviews' })
  @ApiOkResponse({
    type: ReviewsEntity,
  })
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewsDto: UpdateReviewsDto,
  ) {
    return await this.reviewsService.update(id, updateReviewsDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete reviews' })
  @ApiOkResponse({
    type: ReviewsEntity,
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.reviewsService.delete(id);
  }
}
