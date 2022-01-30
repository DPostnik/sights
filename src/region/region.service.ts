import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './region.model';
import { CreateRegionDto } from './dto/create-region.dto';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionRepository: typeof Region) {}

  async create(dto: CreateRegionDto) {
    const region = await this.regionRepository.create(dto);
    return region;
  }

  async getAll() {
    const regions = await this.regionRepository.findAll();
    return regions;
  }

  async getById(id: number) {
    const region = await this.regionRepository.findOne({ where: { id } });
    return region;
  }

  async update(id: number, dto: CreateRegionDto) {
    const { name, country_id } = dto;
    const region = await this.regionRepository.update(
      { name, country_id },
      {
        where: {
          id,
        },
      },
    );
    return region;
  }

  async remove(id: number) {
    const region = await this.regionRepository.destroy({ where: { id } });
    return region;
  }
}
