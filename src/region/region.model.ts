import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from '../country/contry.model';

export interface RegionCreateAttribute {
  name: string;
  country_id: number;
}

@Table({ timestamps: false, tableName: 'region' })
export class Region extends Model<Region, RegionCreateAttribute> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Гродненская область',
    description: 'Название области',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Country)
  @ApiProperty({ example: '1', description: 'Внешний ключ на страну' })
  @Column({
    type: DataType.INTEGER,
  })
  country_id: number;

  @BelongsTo(() => Country)
  country: Country;
}
