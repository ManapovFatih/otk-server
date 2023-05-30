import { CreateTypeHouseDto } from './dto/create-typeHouse.dto';
import { TypeHouseEntity } from './entities/typeHouse.entity';
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
import { TypeHouseService } from './typeHouse.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateTypeHouseDto } from './dto/update-typeHouse.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Type House')
@Controller('typeHouse')
export class TypeHouseController {
  constructor(private readonly typeHouseService: TypeHouseService) {}

  @ApiOperation({ summary: 'Get one by id' })
  @ApiOkResponse({
    type: TypeHouseEntity,
  })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: string) {
    return await this.typeHouseService.findById(+id);
  }

  @ApiOperation({ summary: 'Get all Type House' })
  @ApiOkResponse({
    type: [TypeHouseEntity],
  })
  @Get()
  async getAll() {
    return await this.typeHouseService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Type House' })
  @ApiCreatedResponse({
    type: TypeHouseEntity,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(@UploadedFile() image: Express.Multer.File, @Body() createTypeHouseDto: CreateTypeHouseDto) {
    return await this.typeHouseService.create(createTypeHouseDto, image);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Type House' })
  @ApiOkResponse({
    type: TypeHouseEntity,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() image: Express.Multer.File,
    @Body() updateTypeHouseDto: UpdateTypeHouseDto,
  ) {
    return await this.typeHouseService.update(id, updateTypeHouseDto, image);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Type House' })
  @ApiOkResponse({
    type: TypeHouseEntity,
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.typeHouseService.delete(id);
  }
}
