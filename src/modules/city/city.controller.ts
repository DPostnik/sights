import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { CityService } from './city.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { City } from './city.model';

@Controller('/city')
@ApiTags('Города')
export class CityController {
  constructor(private cityService: CityService) {}

  @ApiOperation({ summary: 'Получение списка городов' })
  @ApiResponse({ status: 200, type: [City] })
  @Get()
  getAllCities() {
    return this.cityService.getAllCities();
  }

  @ApiOperation({ summary: 'Создание города' })
  @ApiResponse({ status: 200, type: City })
  @Post()
  @HttpCode(201)
  createCity(@Body() city: CreateCityDto) {
    return this.cityService.createCity(city);
  }

  @ApiOperation({ summary: 'Получение города по id' })
  @ApiResponse({ status: 200, type: City })
  @Get(':id')
  getEntityById(@Param('id') id: string) {
    return this.cityService.getCityById(id);
  }

  @ApiOperation({ summary: 'Обновление города по id' })
  @Put(':id')
  updateCity(@Param('id') id: string, @Body() city: CreateCityDto) {
    return this.cityService.updateCity(+id, city);
  }

  @ApiOperation({ summary: 'Удаление города по id' })
  @Delete(':id')
  removeCity(@Param('id') id: string) {
    return this.cityService.removeCity(id);
  }
}
