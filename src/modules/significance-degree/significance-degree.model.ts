import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export interface SignificanceDegreeCreationAttributes {
  name: string;
}

@Table({ timestamps: false, tableName: 'significanceDegree' })
export class SignificanceDegree extends Model<
  SignificanceDegree,
  SignificanceDegreeCreationAttributes
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

  @ApiProperty({
    example: 'Мировое',
    description: 'Название степени значимости',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;
}
