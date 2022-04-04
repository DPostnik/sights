import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './city.model';

@Injectable()
export class CityService {
  constructor(@InjectModel(City) private cityRepository: typeof City) {}

  async createCity(dto: CreateCityDto) {
    const city = await this.cityRepository.create(dto);
    return city;
  }

  async getAllCities(limit: string) {
    const cities = await this.cityRepository.findAll(
      limit && { limit: +limit },
    );
    return cities;
  }

  async updateCity(id: number, dto: CreateCityDto) {
    const { name, region_id } = dto;
    const city = await this.cityRepository.update(
      { name, region_id },
      {
        where: { id },
      },
    );
    return city;
  }

  async getCityById(id: string) {
    const city = await this.cityRepository.findByPk(id);
    return city;
  }

  async getCityByName(name: string) {
    return await this.cityRepository.findOne({ where: { name } });
  }

  async removeCity(id: string) {
    const city = await this.cityRepository.destroy({
      where: { id: +id },
    });
    return city;
  }
}
