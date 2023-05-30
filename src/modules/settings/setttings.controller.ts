import { CreateSettingsDto } from './dto/create-settings.dto';
import { SettingsService } from './settings.service';
import { Controller, Get, Param, UseGuards, ParseIntPipe, Put, Body } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SettingsEntity } from './entitties/settings.entity';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @ApiOperation({ summary: 'Get settings' })
  @ApiOkResponse({
    type: SettingsEntity,
  })
  @Get(':id')
  async getSettings(@Param('id', ParseIntPipe) id: number) {
    return await this.settingsService.find(id);
  }

	@UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Set settings' })
  @ApiOkResponse({
    type: SettingsEntity,
  })
  @Put(':id')
  async setSettings(@Param('id', ParseIntPipe) id: number, @Body() createSettingsDto: CreateSettingsDto) {
    return await this.settingsService.upsert(id, createSettingsDto);
  }
}
