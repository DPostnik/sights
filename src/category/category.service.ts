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
    const category = await this.categoryRepository.create(dto);
    return category;
  }

  async getAll(limit: number) {
    const categories = await this.categoryRepository.findAll(
      limit && { limit },
    );
    return categories;
  }

  async getById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });
    return category;
  }

  async update(id: number, dto: CreateCategoryDto) {
    const { name, category_id } = dto;
    const category = await this.categoryRepository.update(
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
    return category;
  }

  async remove(id: number) {
    const category = await this.categoryRepository.destroy({
      where: {
        id,
      },
    });
    return category;
  }
}
