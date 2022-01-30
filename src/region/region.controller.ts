import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Region } from './region.model';
import { CreateRegionDto } from './dto/create-region.dto';

@Controller('region')
@ApiTags('Области')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @ApiOperation({ summary: 'Создание области' })
  @ApiResponse({ status: 201, type: Region })
  @Post()
  create(@Body() region: CreateRegionDto) {
    return this.regionService.create(region);
  }

  @ApiOperation({ summary: 'Получение списка областей' })
  @ApiResponse({ status: 201, type: [Region] })
  @Get()
  getAll() {
    return this.regionService.getAll();
  }

  @ApiOperation({ summary: 'Получение области по id' })
  @ApiResponse({ status: 200, type: Region })
  @Get(':id')
  getRegionById(@Param('id') id: string) {
    return this.regionService.getById(+id);
  }

  @ApiOperation({ summary: 'Обновление области по id' })
  @Put(':id')
  updateRegion(@Param('id') id: string, @Body() dto: CreateRegionDto) {
    return this.regionService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Удаление  области по id' })
  @Delete(':id')
  removeRegion(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
