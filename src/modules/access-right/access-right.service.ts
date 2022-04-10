import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AccessRight } from './access-right.model';
import { CreateAccessRightDto } from './dto/create-acess-right.dto';

@Injectable()
export class AccessRightService {
  constructor(
    @InjectModel(AccessRight) private accessRightRepository: typeof AccessRight,
  ) {}

  async create(dto: CreateAccessRightDto) {
    return await this.accessRightRepository.create(dto);
  }

  async getAll(limit: number) {
    return await this.accessRightRepository.findAll(limit && { limit });
  }

  async getById(id: number) {
    return await this.accessRightRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: CreateAccessRightDto) {
    const { name, description } = dto;
    return await this.accessRightRepository.update(
      {
        name,
        description,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async remove(id: number) {
    return await this.accessRightRepository.destroy({
      where: {
        id,
      },
    });
  }
}
