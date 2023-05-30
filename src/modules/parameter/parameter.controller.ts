import { UpdateParameterDto } from './dto/update-parameter.dto';
import { ParameterEntity } from './entities/parameter.entity';
import { CreateParameterDto } from './dto/create-parameter.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParameterService } from './parameter.service';
import { ParamterWithOptionsEntity } from './entities/parameter-with-options.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Parameter')
@Controller('parameter')
export class ParameterController {
  constructor(private readonly parameterService: ParameterService) {}

  @ApiOperation({ summary: 'Get all parameters' })
  @ApiOkResponse({
    type: [ParameterEntity],
  })
  @Get()
  async getAll() {
    return await this.parameterService.findAll();
  }

  @ApiOperation({ summary: 'Get parameters by category with options' })
  @ApiOkResponse({
    type: [ParamterWithOptionsEntity],
  })
  @Get('/byCategoryWithOptions/:categoryId')
  async getByCategoryWithOptions(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.parameterService.findByCategoryId(categoryId, true);
  }

  @ApiOperation({ summary: 'Get parameters by category' })
  @ApiOkResponse({
    type: [ParamterWithOptionsEntity],
  })
  @Get('/byCategory/:categoryId')
  async getByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.parameterService.findByCategoryId(categoryId, false);
  }

  @ApiOperation({ summary: 'Get common parameters' })
  @ApiOkResponse({
    type: [ParameterEntity],
  })
  @Get('/common')
  async getCommon() {
    return await this.parameterService.findCommon();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create parameter' })
  @ApiCreatedResponse({
    type: ParameterEntity,
  })
  @Post()
  async create(@Body() createParameterDto: CreateParameterDto) {
    return await this.parameterService.create(createParameterDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update parameter' })
  @ApiOkResponse({
    type: ParameterEntity,
  })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateParameterDto: UpdateParameterDto) {
    return await this.parameterService.update(id, updateParameterDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete parameter' })
  @ApiOkResponse({
    type: ParameterEntity,
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.parameterService.delete(id);
  }
}
