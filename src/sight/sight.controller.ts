import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SightService } from './sight.service';
import { CreateSightDto } from './dto/create-sight.dto';

@Controller('sight')
export class SightController {
  constructor(private sightService: SightService) {}

  @Post()
  createCountry(@Body() sight: CreateSightDto) {
    return this.sightService.create(sight);
  }

  @Get()
  getAllCountries() {
    return this.sightService.getAll();
  }

  @Get(':id')
  getCountryById(@Param('id') id: string) {
    return this.sightService.getById(+id);
  }

  @Put(':id')
  updateCountry(@Param('id') id: string, @Body() sight: CreateSightDto) {
    return this.sightService.update(+id, sight);
  }

  @Delete(':id')
  removeCountry(@Param('id') id: string) {
    return this.sightService.remove(+id);
  }
}
