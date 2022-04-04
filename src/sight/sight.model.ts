import {
  BelongsTo,
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
  city: string;
  coordinatesId: number;
  cityId: number;
}

@Table({ timestamps: false, tableName: 'sight' })
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
  })
  coordinatesId: number;

  @BelongsTo(() => Coordinates)
  coordinates: Coordinates;

  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
  })
  cityId: number;

  @BelongsTo(() => City)
  city: City;
}
