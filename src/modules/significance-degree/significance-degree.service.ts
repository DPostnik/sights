import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SignificanceDegree } from './significance-degree.model';
import { CreateSignificanceDegreeDto } from './dto/create-significance-degree.dto';

@Injectable()
export class SignificanceDegreeService {
  constructor(
    @InjectModel(SignificanceDegree)
    private significanceDegreeRepository: typeof SignificanceDegree,
  ) {}

  async create(dto: CreateSignificanceDegreeDto) {
    return await this.significanceDegreeRepository.create(dto);
  }

  async getAll(limit: number) {
    return await this.significanceDegreeRepository.findAll(limit && { limit });
  }

  async getById(id: number) {
    return await this.significanceDegreeRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: CreateSignificanceDegreeDto) {
    const { name } = dto;
    return await this.significanceDegreeRepository.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async remove(id: number) {
    return await this.significanceDegreeRepository.destroy({
      where: {
        id,
      },
    });
  }
}
