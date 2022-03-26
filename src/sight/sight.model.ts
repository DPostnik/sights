import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Coordinates } from '../coordinates/coordinates.model';
import { City } from '../city/city.model';

export interface SightCreationAttributes {
  name: string;
  description: string;
  date: Date;
  founder: string;
  cityId: number;
  coordinatesId: number;
}

@Table({ tableName: 'sight' })
export class Sight extends Model<Sight, SightCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  founder: string;

  @ForeignKey(() => Coordinates)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  coordinatesId: number;

  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  cityId: number;
}
