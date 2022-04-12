import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { of } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUsersByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getUserByGmail(gmail: string) {
    return await this.userRepository.findOne({
      where: { gmail },
    });
  }

  async updateUser(id: number, dto: CreateUserDto) {
    return of(this.userRepository.update(dto, { where: { id } }));
  }
}
