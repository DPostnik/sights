import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export interface CategoryCreationAttributes {
  name: string;
}

@Table({ timestamps: false, tableName: 'category' })
export class Category extends Model<Category, CategoryCreationAttributes> {
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

  @ApiProperty({ example: 'Архитектура', description: 'Название категории' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Category)
  @ApiProperty({ example: '2', description: 'Внешний ключ на категорию' })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  category_id: number;
}
