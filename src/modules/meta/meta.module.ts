import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';
import { CountryModule } from '../country/country.module';
import { RegionModule } from '../region/region.module';
import { CityModule } from '../city/city.module';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [MetaController],
  providers: [MetaService],
  imports: [CountryModule, RegionModule, CityModule, CategoryModule],
  exports: [],
})
export class MetaModule {}
