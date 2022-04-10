import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './region.model';
import { CreateRegionDto } from './dto/create-region.dto';
import { CountryService } from '../country/country.service';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private regionRepository: typeof Region,
    private countryService: CountryService,
  ) {}

  async create(dto: CreateRegionDto) {
    const { country: countryName } = dto;
    const country = await this.countryService.findCountryByName(countryName);
    return await this.regionRepository.create({
      ...dto,
      country_id: country.id,
    });
  }

  async getAll() {
    return await this.regionRepository.findAndCountAll({
      include: { all: true },
    });
  }

  async getById(id: number) {
    return await this.regionRepository.findByPk(id);
  }

  async findByName(name: string) {
    return await this.regionRepository.findOne({ where: { name } });
  }

  async update(id: number, dto: CreateRegionDto) {
    const { name } = dto;
    return await this.regionRepository.update(
      { name },
      {
        where: {
          id,
        },
      },
    );
  }

  async remove(id: number) {
    return await this.regionRepository.destroy({ where: { id } });
  }
}
