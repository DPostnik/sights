import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sight } from './sight.model';
import { CreateSightDto } from './dto/create-sight.dto';
import { CoordinatesService } from '../coordinates/coordinates.service';

@Injectable()
export class SightService {
  constructor(
    @InjectModel(Sight) private sightRepository: typeof Sight,
    private coordinatesRepository: CoordinatesService,
  ) {}

  async create(dto: CreateSightDto) {
    const { coordinates } = dto;
    const coordinatesId = await this.coordinatesRepository.create(coordinates);
    return await this.sightRepository.create({
      ...dto,
      coordinatesId: coordinatesId.id,
    });
  }

  async getAll() {
    const data = await this.sightRepository.findAll({ include: { all: true } });
    return data.map((item) => {
      const { date, name, id, coordinates, description, founder } = item;
      return { date, name, id, coordinates, description, founder };
    });
  }

  async getById(id: number) {
    return await this.sightRepository.findOne({ where: { id } });
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
