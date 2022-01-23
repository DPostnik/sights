import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CountryInterface } from './interfaces/country.interface';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Post()
  createCountry(@Body() country: CreateCountryDto) {
    return this.countryService.create(country);
  }

  @Get()
  getAllCountries() {
    return this.countryService.getAll();
  }

  @Get(':id')
  getCountryById(@Param('id') id: string) {
    return `get country with id: ${id}`;
  }

  @Put(':id')
  updateCountry(@Param('id') id: string, @Body() country: CountryInterface) {
    return `update country
            with id: ${id},
            set ${country.name}`;
  }

  @Delete(':id')
  removeCountry(@Param('id') id: string) {
    return this.countryService.remove(id);
  }
}
