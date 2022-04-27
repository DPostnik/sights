import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { from, map, of } from 'rxjs';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  getAllUsers(limit: number, offset = 0, search = '') {
    const sqlSearch = '%'.concat(search).concat('%');
    return from(
      this.userRepository.findAndCountAll({
        limit,
        offset,
        where: {
          name: {
            [Op.like]: sqlSearch,
          },
        },
      }),
    ).pipe(
      map((res) => ({
        count: res.count,
        rows: res.rows.map((item: any) => {
          const { password, ...user } = item.dataValues;
          return { ...user };
        }),
      })),
    );
  }

  getUserById(id: number) {
    return from(this.userRepository.findByPk(id));
  }

  async getUserByEmail(email: string) {
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
