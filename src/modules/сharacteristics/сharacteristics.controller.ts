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
import { CharacteristicsEntity } from './entities/сharacteristics.entity';
import { CreateСharacteristicsDto } from './dto/create-сharacteristics.dto';
import { UpdateCharacteristicsDto } from './dto/update-сharacteristics.dto';
import { СharacteristicsService } from './сharacteristics.service';

@ApiTags('Сharacteristics')
@Controller('сharacteristics')
export class СharacteristicsController {
  constructor(private readonly сharacteristicsService: СharacteristicsService) {}

  @ApiOperation({ summary: 'Get one by id' })
  @ApiOkResponse({
    type: CharacteristicsEntity,
  })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: string) {
    return await this.сharacteristicsService.findById(+id);
  }

  @ApiOperation({ summary: 'Get all Сharacteristics' })
  @ApiOkResponse({
    type: [CharacteristicsEntity],
  })
  @Get()
  async getAll() {
    return await this.сharacteristicsService.findAll();
  }

  @ApiOperation({ summary: 'Create Сharacteristics' })
  @ApiCreatedResponse({
    type: CharacteristicsEntity,
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  async create(@Body() createСharacteristicsDto: CreateСharacteristicsDto) {
    return await this.сharacteristicsService.create(createСharacteristicsDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Сharacteristics' })
  @ApiOkResponse({
    type: CharacteristicsEntity,
  })
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateСharacteristicsDto: UpdateCharacteristicsDto,
  ) {
    return await this.сharacteristicsService.update(id, updateСharacteristicsDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Сharacteristics' })
  @ApiOkResponse({
    type: CharacteristicsEntity,
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.сharacteristicsService.delete(id);
  }
}
