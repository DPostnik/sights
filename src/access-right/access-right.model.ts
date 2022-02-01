import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export interface AccessRightCreationAttributes {
  name: string;
  description: string;
}

@Table({ tableName: 'accessRight' })
export class AccessRight extends Model<
  AccessRight,
  AccessRightCreationAttributes
> {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Администратор', description: 'Название роли' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Пользователь с данным ролью имеет неограниченные права',
    description: 'Описание роли',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  description: string;
}
