import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Country } from './contry.model';

@Controller('country')
@ApiTags('Страны')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @ApiOperation({ summary: 'Создание страны' })
  @ApiResponse({ status: 201, type: Country })
  @Post()
  createCountry(@Body() country: CreateCountryDto) {
    return this.countryService.create(country);
  }

  @ApiOperation({ summary: 'Получение списка стран' })
  @ApiResponse({ status: 200, type: [Country] })
  @Get()
  getAllCountries() {
    return this.countryService.getAll();
  }

  @ApiOperation({ summary: 'Получение страны по id' })
  @ApiResponse({ status: 200, type: Country })
  @Get(':id')
  getCountryById(@Param('id') id: string) {
    return this.countryService.getById(+id);
  }

  @ApiOperation({ summary: 'Обновление страны по id' })
  @Put(':id')
  updateCountry(@Param('id') id: string, @Body() country: CreateCountryDto) {
    return this.countryService.update(+id, country);
  }

  @ApiOperation({ summary: 'Удаление страны по id' })
  @Delete(':id')
  removeCountry(@Param('id') id: string) {
    return this.countryService.remove(+id);
  }
}
