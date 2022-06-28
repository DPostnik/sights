import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserSights } from './user-sight/user-sight.model';
import { Sight } from '../sight/sight.model';

export interface UserCreationAttributes {
  email?: string;
  gmail?: string;
  password?: string;
  name: string;
  roleId?: number;
}

@Table({ timestamps: false, tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Логин пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  email: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Логин пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  gmail: string;

  @ApiProperty({ example: '1234', description: 'Пароль пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @ApiProperty({ example: 'Name', description: 'Имя пользователя' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'photoUrl', description: 'photo пользователя' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  photoUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshToken?: string;

  @ForeignKey(() => Role)
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @BelongsToMany(() => Sight, () => UserSights)
  favouriteSights: Sight[];
}
