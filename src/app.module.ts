import { Module } from '@nestjs/common';
import { CountryController } from './country/country.controller';
import { CountryService } from './country/country.service';
import { CityController } from './city/city.controller';
import { CityService } from './city/city.service';

@Module({
  imports: [],
  controllers: [CountryController, CityController],
  providers: [CountryService, CityService],
})
export class AppModule {}
