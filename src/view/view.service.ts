import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { View } from './view.model';
import { CreateViewDto } from './dto/create-view.dto';

@Injectable()
export class ViewService {
  constructor(@InjectModel(View) private viewRepository: typeof View) {}

  async create(dto: CreateViewDto) {
    const view = await this.viewRepository.create(dto);
    return view;
  }

  async getAll(limit: string) {
    const views = await this.viewRepository.findAll(limit && { limit: +limit });
    return views;
  }

  async update(id: number, dto: CreateViewDto) {
    const { name } = dto;
    const view = await this.viewRepository.update(
      { name },
      {
        where: { id },
      },
    );
    return view;
  }

  async getById(id: string) {
    const view = await this.viewRepository.findByPk(id);
    return view;
  }

  async remove(id: string) {
    const view = await this.viewRepository.destroy({
      where: { id: +id },
    });
    return view;
  }
}
