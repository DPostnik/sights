import { Injectable } from '@nestjs/common';
import { CountryService } from '../country/country.service';
import { RegionService } from '../region/region.service';
import { CityService } from '../city/city.service';
import { CategoryService } from '../category/category.service';
import { forkJoin, map } from 'rxjs';

@Injectable()
export class MetaService {
  constructor(
    private countryService: CountryService,
    private regionService: RegionService,
    private cityService: CityService,
    private categoryService: CategoryService,
  ) {}

  getAll() {
    return forkJoin([
      this.countryService.getAll(),
      this.regionService.getAll(),
      this.cityService.getAll(),
      this.categoryService.getAll(),
    ]).pipe(
      map(([countries, regions, cities, categories]) => {
        const countriesList = countries.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        const regionsList = regions.map((item) => ({
          id: item.id,
          name: item.name,
          countryId: item.country_id,
        }));
        const citiesList = cities.map((item) => ({
          id: item.id,
          name: item.name,
          regionId: item.region_id,
        }));
        const categoriesList = categories.map((item) => ({
          id: item.id,
          name: item.name,
        }));
        return {
          meta: {
            countries: countriesList,
            regions: regionsList,
            cities: citiesList,
            categories: categoriesList,
          },
        };
      }),
    );
  }
}
