import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

  async create(dto: CreateCategoryDto) {
    return await this.categoryRepository.create(dto);
  }

  async getAll() {
    return await this.categoryRepository.findAll();
  }

  async getById(id: number) {
    return await this.categoryRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findCategoryByValue(value: string) {
    return await this.categoryRepository.findOne({ where: { name: value } });
  }

  async findCategoriesByValues(values: string[]) {
    return await Promise.all(
      values.map(async (item) => {
        return await this.findCategoryByValue(item);
      }),
    );
  }

  async update(id: number, dto: CreateCategoryDto) {
    const { name, category_id } = dto;
    return await this.categoryRepository.update(
      {
        name,
        category_id,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async remove(id: number) {
    return await this.categoryRepository.destroy({
      where: {
        id,
      },
    });
  }
}
