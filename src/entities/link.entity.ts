import {
  Table,
  Column,
  Model,
  DataType,
  Length,
  Is,
} from 'sequelize-typescript';
import { ALLOWED_VALUE_SYMBOLS } from 'src/constants';

@Table({
  tableName: 'links',
  timestamps: true,
  indexes: [{ fields: ['linkId', 'isActive'], unique: true }],
})
export class Link extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  linkId: string;

  @Length({ min: 3, max: 255 })
  @Is(ALLOWED_VALUE_SYMBOLS)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isActive: boolean;
}
