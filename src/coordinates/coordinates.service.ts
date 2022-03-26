import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Coordinates } from './coordinates.model';
import { CreateCoordinatesDto } from './dto/create-coordinates.dto';

@Injectable()
export class CoordinatesService {
  constructor(
    @InjectModel(Coordinates) private coordinatesRepository: typeof Coordinates,
  ) {}

  async create(dto: CreateCoordinatesDto) {
    return await this.coordinatesRepository.create(dto);
  }

  async getAll() {
    return await this.coordinatesRepository.findAll();
  }

  async getById(id: number) {
    return await this.coordinatesRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, dto: CreateCoordinatesDto) {
    const { longitude, latitude } = dto;
    return await this.coordinatesRepository.update(
      { longitude, latitude },
      {
        where: {
          id,
        },
      },
    );
  }

  async remove(id: number) {
    return await this.coordinatesRepository.destroy({
      where: { id },
    });
  }
}
