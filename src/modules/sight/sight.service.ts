import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sight } from './sight.model';
import { CreateSightDto } from './dto/create-sight.dto';
import { CoordinatesService } from '../coordinates/coordinates.service';
import { CityService } from '../city/city.service';
import { CategoryService } from '../category/category.service';
import {
  getShortenedSightInfo,
  getShortenedSightsInfo,
  sightIncludeForGetFullResource,
} from '../../utils/sight.util';
import { catchError, from, map } from 'rxjs';
import { checkCoordinatesEqual } from '../../utils/coordinates.util';
import { checkCityEqual } from '../../utils/city.util';
import { checkCategoriesEqual } from '../../utils/category.util';

@Injectable()
export class SightService {
  constructor(
    @InjectModel(Sight) private sightRepository: typeof Sight,
    private coordinatesRepository: CoordinatesService,
    private cityRepository: CityService,
    private categoryRepository: CategoryService,
  ) {}

  async create(dto: CreateSightDto): Promise<Sight> {
    const { coordinates: coordinate, city: cityName, name, categories } = dto;
    const coordinatesEntity = await this.coordinatesRepository.create(
      coordinate,
    );
    const cityEntity = await this.cityRepository.findCityByName(cityName);
    const sight = await this.sightRepository.create({
      ...dto,
      name,
      coordinatesId: coordinatesEntity.id,
      cityId: cityEntity.id,
    });
    await this.setSightCategory(sight, categories);
    return sight;
  }

  getAllSights(limit: number, offset = 0, search = '') {
    const sqlSearch = '%'.concat(search).concat('%');
    return from(
      this.sightRepository.findAndCountAll({
        ...sightIncludeForGetFullResource,
        limit,
        offset,
        distinct: true,
        where: {
          name: {
            [Op.like]: sqlSearch,
          },
        },
      }),
    ).pipe(
      map((data) => ({
        total: data.count,
        data: getShortenedSightsInfo(data.rows),
      })),
      catchError((error) => {
        const { response } = error;
        throw new HttpException(
          { message: response.data.message },
          response.status,
        );
      }),
    );
  }

  async getById(id: number) {
    const data = await this.sightRepository.findByPk(id, {
      ...sightIncludeForGetFullResource,
    });
    return getShortenedSightInfo(data);
  }

  async update(id: number, dto: CreateSightDto) {
    const sight = await this.sightRepository.findByPk(id, {
      ...sightIncludeForGetFullResource,
    });
    const { name, description, mainImage, city, categories, coordinates } = dto;
    if (checkCityEqual(sight.city.name, city)) {
      const cityEntity = await this.cityRepository.findCityByName(city);
      await sight.$set('city', cityEntity.id);
    }
    if (coordinates) {
      if (checkCoordinatesEqual(coordinates, sight.coordinates)) {
        const coordinatesEntity = await this.coordinatesRepository.create(
          coordinates,
        );
        await sight.$set('coordinates', coordinatesEntity.id);
      }
    }
    if (categories) {
      if (!checkCategoriesEqual(categories, sight.categories)) {
        await this.setSightCategory(sight, categories);
      }
    }
    return await this.sightRepository.update(
      { name, description, mainImage },
      {
        where: {
          id,
        },
      },
    );
  }

  private async setSightCategory(sight: Sight, categories) {
    const categoriesId = await this.categoryRepository.findCategoriesByValues(
      categories,
    );
    await sight.$set('categories', [...categoriesId]);
  }

  async remove(id: number) {
    return await this.sightRepository.destroy({ where: { id } });
  }
}
