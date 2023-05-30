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
import { AnketaEntity } from './entities/anketa.entity';
import { CreateAnketaDto } from './dto/create-anketa.dto';
import { UpdateAnketaDto } from './dto/update-anketa.dto';
import { AnketaService } from './anketa.service';

@ApiTags('Anketa')
@Controller('anketa')
export class AnketaController {
  constructor(private readonly anketaService: AnketaService) {}

  @ApiOperation({ summary: 'Get one by id' })
  @ApiOkResponse({
    type: AnketaEntity,
  })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: string) {
    return await this.anketaService.findById(+id);
  }

  @ApiOperation({ summary: 'Get all Area House' })
  @ApiOkResponse({
    type: [AnketaEntity],
  })
  @Get()
  async getAll() {
    return await this.anketaService.findAll();
  }

  @ApiOperation({ summary: 'Create Area House' })
  @ApiCreatedResponse({
    type: AnketaEntity,
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  async create(@Body() createAnketaDto: CreateAnketaDto) {
    return await this.anketaService.create(createAnketaDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Area House' })
  @ApiOkResponse({
    type: AnketaEntity,
  })
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnketaDto: UpdateAnketaDto,
  ) {
    return await this.anketaService.update(id, updateAnketaDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Area House' })
  @ApiOkResponse({
    type: AnketaEntity,
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.anketaService.delete(id);
  }
}
