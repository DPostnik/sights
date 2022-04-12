import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sight } from './sight.model';
import { CreateSightDto } from './dto/create-sight.dto';
import { CoordinatesService } from '../coordinates/coordinates.service';
import { CityService } from '../city/city.service';
import { CategoryService } from '../category/category.service';
import {
  getShortenedSightInfo,
  getShortenedSightsInfo,
} from '../../utils/sight.util';
import { City } from '../city/city.model';
import { Coordinates } from '../coordinates/coordinates.model';
import { Region } from '../region/region.model';
import { Category } from '../category/category.model';
import { catchError, from, map } from 'rxjs';
import { Country } from '../country/country.model';

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
    const categoriesId = await this.categoryRepository.findCategoriesByValues(
      categories,
    );
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
    await sight.$set('categories', [...categoriesId]);
    return sight;
  }

  getAllSights(limit: number, offset = 0) {
    return from(
      this.sightRepository.findAndCountAll({
        include: [
          {
            model: City,
            include: [
              {
                model: Region,
                include: [
                  {
                    model: Country,
                  },
                ],
              },
            ],
          },
          Coordinates,
          Category,
        ],
        limit,
        offset,
        distinct: true,
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
      include: [
        {
          model: City,
          include: [
            {
              model: Region,
              include: [
                {
                  model: Country,
                },
              ],
            },
          ],
        },
        Coordinates,
        Category,
      ],
    });
    return getShortenedSightInfo(data);
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
