import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Sight } from '../sight/sight.model';
import { Category } from './category.model';

@Table({
  timestamps: false,
  tableName: 'category_sight',
  createdAt: false,
  updatedAt: false,
})
export class CategorySight extends Model<CategorySight> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;

  @ForeignKey(() => Sight)
  @Column({
    type: DataType.INTEGER,
  })
  sightId: number;
}
