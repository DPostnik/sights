import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Region } from '../region/region.model';

export interface CityCreationAttributes {
  name: string;
  region_id: number;
}

@Table({ tableName: 'city' })
export class City extends Model<City, CityCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Гродно', description: 'Название города' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Region)
  @ApiProperty({ example: '1', description: 'Внешний ключ на регион' })
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;
}
