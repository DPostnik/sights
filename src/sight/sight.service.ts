import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sight } from './sight.model';
import { CreateSightDto } from './dto/create-sight.dto';
import { CoordinatesService } from '../coordinates/coordinates.service';
import { CityService } from '../city/city.service';

@Injectable()
export class SightService {
  constructor(
    @InjectModel(Sight) private sightRepository: typeof Sight,
    private coordinatesRepository: CoordinatesService,
    private cityRepository: CityService,
  ) {}

  async create(dto: CreateSightDto) {
    const { coordinates, city, name } = dto;
    const coordinatesEntity = await this.coordinatesRepository.create(
      coordinates,
    );
    const cityEntity = await this.cityRepository.getCityByName(city);
    return await this.sightRepository.create({
      name,
      coordinatesId: coordinatesEntity.id,
      cityId: cityEntity.id,
    });
  }

  async getAll(limit: number, offset = 0) {
    const data = await this.sightRepository.findAndCountAll({
      include: { all: true },
      limit,
      offset,
    });
    return {
      total: data.count,
      data: data.rows.map((item) => {
        const { date, name, id, coordinates, description, founder, city } =
          item;
        return { date, name, id, coordinates, description, founder, city };
      }),
    };
  }

  async getById(id: number) {
    return await this.sightRepository.findByPk(id);
  }

  async update(id: number, dto: CreateSightDto) {
    const { name } = dto;
    return await this.sightRepository.update(
      { name },
      {
        where: {
          id,
        },
      },
    );
  }

  async remove(id: number) {
    return await this.sightRepository.destroy({ where: { id } });
  }
}
