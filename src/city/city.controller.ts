import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { CityInterface } from './interfaces/city.interface';
import { CityService } from './city.service';

@Controller('/city')
export class CityController {
  constructor(private cityService: CityService) {}

  @Get()
  getAllCities(@Query() limit: string) {
    return this.cityService.getAllCities(limit);
  }

  @Post()
  @HttpCode(201)
  createCity(@Body() city: CreateCityDto) {
    return this.cityService.createCity(city);
  }

  @Get(':id')
  getEntityById(@Param('id') id: string) {
    return this.cityService.getCityById(id);
  }

  @Put(':id')
  updateCity(@Param('id') id: string, @Body() city: CityInterface) {
    return `${id}, ${city.name}`;
  }

  @Delete(':id')
  removeCity(@Param('id') id: string) {
    return this.cityService.removeCity(id);
  }
}
