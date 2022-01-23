import { Injectable } from '@nestjs/common';
import { CityInterface } from './interfaces/city.interface';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CityService {
  private cities = [];

  getAllCities = (limit: string) => {
    return this.cities.slice(0, +limit);
  };

  createCity = (city: CreateCityDto) => {
    this.cities.push(city);
  };

  getCityById = (id: string) => {
    return this.cities.find((item: CityInterface) => item.id === id);
  };

  removeCity = (id: string) => {
    this.cities = this.cities.filter((item: CityInterface) => item.id !== id);
  };
}
