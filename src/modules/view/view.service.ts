import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { View } from './view.model';
import { CreateViewDto } from './dto/create-view.dto';

@Injectable()
export class ViewService {
  constructor(@InjectModel(View) private viewRepository: typeof View) {}

  async create(dto: CreateViewDto) {
    return await this.viewRepository.create(dto);
  }

  async getAll(limit: string) {
    return await this.viewRepository.findAll(limit && { limit: +limit });
  }

  async update(id: number, dto: CreateViewDto) {
    const { name } = dto;
    return await this.viewRepository.update(
      { name },
      {
        where: { id },
      },
    );
  }

  async getById(id: string) {
    return await this.viewRepository.findByPk(id);
  }

  async remove(id: string) {
    return await this.viewRepository.destroy({
      where: { id: +id },
    });
  }
}
