import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './contry.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country) private countryRepository: typeof Country,
  ) {}

  async create(dto: CreateCountryDto) {
    const country = await this.countryRepository.create(dto);
    return country;
  }

  async getAll() {
    const countries = await this.countryRepository.findAll();
    return countries;
  }

  async getById(id: number) {
    const country = await this.countryRepository.findByPk(id);
    return country;
  }

  async findCountryByName(name: string) {
    return await this.countryRepository.findOne({ where: { name } });
  }

  async update(id: number, dto: CreateCountryDto) {
    const { name } = dto;
    const country = await this.countryRepository.update(
      { name },
      {
        where: {
          id,
        },
      },
    );
    return country;
  }

  async remove(id: number) {
    const country = await this.countryRepository.destroy({ where: { id } });
    return country;
  }
}
