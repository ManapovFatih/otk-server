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
import { AreaHouseEntity } from './entities/areaHouse.entity';
import { CreateAreaHouseDto } from './dto/create-areaHouse.dto';
import { UpdateAreaHouseDto } from './dto/update-areaHouse.dto';
import { AreaHouseService } from './areaHouse.service';

@ApiTags('AreaHouse')
@Controller('areaHouse')
export class AreaHouseController {
  constructor(private readonly areaHouseService: AreaHouseService) {}

  @ApiOperation({ summary: 'Get one by id' })
  @ApiOkResponse({
    type: AreaHouseEntity,
  })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: string) {
    return await this.areaHouseService.findById(+id);
  }

  @ApiOperation({ summary: 'Get all Area House' })
  @ApiOkResponse({
    type: [AreaHouseEntity],
  })
  @Get()
  async getAll() {
    return await this.areaHouseService.findAll();
  }

  @ApiOperation({ summary: 'Create Area House' })
  @ApiCreatedResponse({
    type: AreaHouseEntity,
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  async create(@Body() createAreaHouseDto: CreateAreaHouseDto) {
    return await this.areaHouseService.create(createAreaHouseDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Area House' })
  @ApiOkResponse({
    type: AreaHouseEntity,
  })
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAreaHouseDto: UpdateAreaHouseDto,
  ) {
    return await this.areaHouseService.update(id, updateAreaHouseDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Area House' })
  @ApiOkResponse({
    type: AreaHouseEntity,
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.areaHouseService.delete(id);
  }
}
