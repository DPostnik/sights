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
    const region = await this.regionRepository.create({
      ...dto,
      country_id: country.id,
    });
    return region;
  }

  async getAll() {
    const regions = await this.regionRepository.findAndCountAll({
      include: { all: true },
    });
    return regions;
  }

  async getById(id: number) {
    const region = await this.regionRepository.findByPk(id);
    return region;
  }

  async findByName(name: string) {
    return await this.regionRepository.findOne({ where: { name } });
  }

  async update(id: number, dto: CreateRegionDto) {
    const { name } = dto;
    const region = await this.regionRepository.update(
      { name },
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
