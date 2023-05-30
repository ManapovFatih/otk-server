import { CreateSpecificationDto } from './dto/create-specification.dto';
import { SpecificationEntity } from './entities/specification.entity';
import { SpecificationService } from './specification.service';
import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Specification')
@Controller('specification')
export class SpecificationController {
  constructor(private readonly specificationService: SpecificationService) {}

  @ApiOperation({ summary: 'Get all specifications by categoryId' })
  @ApiOkResponse({
    type: [SpecificationEntity],
  })
  @Get('/byCategory/:categoryId')
  async getByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.specificationService.findByCategoryId(categoryId);
  }

  @ApiOperation({ summary: 'Get all specifications' })
  @ApiOkResponse({
    type: [SpecificationEntity],
  })
  @Get()
  async getAll() {
    return await this.specificationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create specification' })
  @ApiOkResponse({
    type: SpecificationEntity,
  })
  @Post()
  async create(@Body() createSpecificationDto: CreateSpecificationDto) {
    return await this.specificationService.create(createSpecificationDto);
  }
}
