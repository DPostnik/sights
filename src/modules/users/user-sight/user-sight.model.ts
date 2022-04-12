import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users.model';
import { Sight } from '../../sight/sight.model';

@Table({
  timestamps: false,
  tableName: 'user_sights',
})
export class UserSights extends Model<UserSights> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Sight)
  @Column({
    type: DataType.INTEGER,
  })
  sightId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;
}
