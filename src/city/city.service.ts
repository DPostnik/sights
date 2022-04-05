import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './city.model';
import { RegionService } from '../region/region.service';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City) private cityRepository: typeof City,
    private regionService: RegionService,
  ) {}

  async createCity(dto: CreateCityDto) {
    const { region: name } = dto;
    const region = await this.regionService.findByName(name);
    return await this.cityRepository.create({
      ...dto,
      region_id: region.id,
    });
  }

  async getAllCities(limit: number) {
    const cities = await this.cityRepository.findAll({
      include: { all: true },
      limit: limit || 100,
    });
    return cities;
  }

  async updateCity(id: number, dto: CreateCityDto) {
    const { name } = dto;
    const city = await this.cityRepository.update(
      { name },
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

  async findCityByName(name: string) {
    return await this.cityRepository.findOne({ where: { name } });
  }

  async removeCity(id: string) {
    const city = await this.cityRepository.destroy({
      where: { id: +id },
    });
    return city;
  }
}
