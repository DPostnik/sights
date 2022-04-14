import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './city.model';
import { RegionService } from '../region/region.service';
import { Region } from '../region/region.model';

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

  async getAll() {
    return await this.cityRepository.findAll({
      include: [Region],
    });
  }

  async updateCity(id: number, dto: CreateCityDto) {
    const { name } = dto;
    return await this.cityRepository.update(
      { name },
      {
        where: { id },
      },
    );
  }

  async getCityById(id: string) {
    return await this.cityRepository.findByPk(id);
  }

  async findCityByName(name: string) {
    return await this.cityRepository.findOne({ where: { name } });
  }

  async removeCity(id: string) {
    return await this.cityRepository.destroy({
      where: { id: +id },
    });
  }
}
