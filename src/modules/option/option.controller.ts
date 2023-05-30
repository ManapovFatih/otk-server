import { UpdateOptionDto } from './dto/update-option.dto';
import { CreateOptionDto } from './dto/create-option.dto';
import { OptionEntity } from './entities/option.entity';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OptionService } from './option.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OptionWithPreloadsEntity } from './entities/option-with-preloads.entity';

@ApiTags('Option')
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @ApiOperation({ summary: 'Get all options with parameters' })
  @ApiOkResponse({
    type: [OptionWithPreloadsEntity],
  })
  @Get()
  async getAll() {
    return await this.optionService.findAll();
  }

  @ApiOperation({ summary: 'Get option by id with parameter' })
  @ApiOkResponse({
    type: OptionWithPreloadsEntity,
  })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.optionService.findById(id);
  }

  @ApiOperation({ summary: 'Get options by parameter' })
  @ApiOkResponse({
    type: [OptionEntity],
  })
  @Get('/byParameter/:parameterId')
  async getByParameter(@Param('parameterId', ParseIntPipe) parameterId: number) {
    return await this.optionService.findByParameterId(parameterId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create option' })
  @ApiOkResponse({
    type: OptionEntity,
  })
  @Post()
  async create(@Body() createOptionDto: CreateOptionDto) {
    return await this.optionService.create(createOptionDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update option' })
  @ApiOkResponse({
    type: OptionEntity,
  })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateOptionDto: UpdateOptionDto) {
    return await this.optionService.update(id, updateOptionDto);
  }
}
