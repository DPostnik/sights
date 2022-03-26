import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface CoordinatesCreationAttributes {
  name: string;
}

@Table({ tableName: 'coordinates' })
export class Coordinates extends Model<
  Coordinates,
  CoordinatesCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.FLOAT,
  })
  longitude: number;

  @Column({
    type: DataType.FLOAT,
  })
  latitude: number;
}
