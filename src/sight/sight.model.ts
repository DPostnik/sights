import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Coordinates } from '../coordinates/coordinates.model';

export interface SightCreationAttributes {
  name: string;
  description: string;
  date: Date;
  founder: string;
  // city: number;
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
  })
  coordinatesId: Coordinates;

  @BelongsTo(() => Coordinates)
  coordinates: Coordinates;

  // @HasOne(() => City, 'cityId')
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: true,
  // })
  // city: City;
}
