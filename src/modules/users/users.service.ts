import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { from, map, of } from 'rxjs';
import { Op } from 'sequelize';
import { Role } from '../roles/roles.model';
import { getShortenedRole } from '../../utils/user.util';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(dto: CreateUserDto) {
    return await this.userRepository.create({ ...dto, roleId: 2 });
  }

  getAllUsers(limit: number, offset = 0, search = '') {
    const sqlSearch = '%'.concat(search).concat('%');
    return from(
      this.userRepository.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ['password', 'roleId', 'refreshToken'] },
        where: {
          name: {
            [Op.like]: sqlSearch,
          },
        },
        distinct: true,
        include: [Role],
      }),
    ).pipe(
      map((res) => ({
        total: res.count,
        data: getShortenedRole(res.rows),
      })),
    );
  }

  getUserById(id: number) {
    return from(
      this.userRepository.findByPk(id, {
        attributes: { exclude: ['password'] },
      }),
    );
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

  async updateUserRefreshToken(id: number, refreshToken) {
    return await this.userRepository.update(
      { refreshToken },
      { where: { id } },
    );
  }

  async clearRefreshToken(userId: number) {
    await this.userRepository.update(
      { refreshToken: null },
      {
        where: { id: userId, refreshToken: { [Op.not]: null } },
      },
    );
  }
}
