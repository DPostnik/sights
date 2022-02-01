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
    const significanceDegree = await this.significanceDegreeRepository.create(
      dto,
    );
    return significanceDegree;
  }

  async getAll(limit: number) {
    const significanceDegrees = await this.significanceDegreeRepository.findAll(
      limit && { limit },
    );
    return significanceDegrees;
  }

  async getById(id: number) {
    const significanceDegree = await this.significanceDegreeRepository.findOne({
      where: {
        id,
      },
    });
    return significanceDegree;
  }

  async update(id: number, dto: CreateSignificanceDegreeDto) {
    const { name } = dto;
    const significanceDegree = await this.significanceDegreeRepository.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      },
    );
    return significanceDegree;
  }

  async remove(id: number) {
    const significanceDegree = await this.significanceDegreeRepository.destroy({
      where: {
        id,
      },
    });
    return significanceDegree;
  }
}
