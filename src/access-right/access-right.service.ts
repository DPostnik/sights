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
    const accessRight = await this.accessRightRepository.create(dto);
    return accessRight;
  }

  async getAll(limit: number) {
    const accessRights = await this.accessRightRepository.findAll(
      limit && { limit },
    );
    return accessRights;
  }

  async getById(id: number) {
    const accessRight = await this.accessRightRepository.findOne({
      where: {
        id,
      },
    });
    return accessRight;
  }

  async update(id: number, dto: CreateAccessRightDto) {
    const { name, description } = dto;
    const accessRight = await this.accessRightRepository.update(
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
    return accessRight;
  }

  async remove(id: number) {
    const accessRight = await this.accessRightRepository.destroy({
      where: {
        id,
      },
    });
    return accessRight;
  }
}
