import { Module } from '@nestjs/common';
import { CountryController } from './country/country.controller';
import { CountryService } from './country/country.service';

@Module({
  imports: [],
  controllers: [CountryController],
  providers: [CountryService],
})
export class AppModule {}
