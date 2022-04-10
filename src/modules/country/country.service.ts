import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './country.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country) private countryRepository: typeof Country,
  ) {}

  async create(dto: CreateCountryDto) {
    return await this.countryRepository.create(dto);
  }

  async getAll() {
    return await this.countryRepository.findAll();
  }

  async getById(id: number) {
    return await this.countryRepository.findByPk(id);
  }

  async findCountryByName(name: string) {
    return await this.countryRepository.findOne({ where: { name } });
  }

  async update(id: number, dto: CreateCountryDto) {
    const { name } = dto;
    return await this.countryRepository.update(
      { name },
      {
        where: {
          id,
        },
      },
    );
  }

  async remove(id: number) {
    return await this.countryRepository.destroy({ where: { id } });
  }
}
