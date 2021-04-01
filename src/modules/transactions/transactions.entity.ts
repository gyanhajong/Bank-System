import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TableOptions } from 'sequelize-typescript';
import { Accounts } from '../account/accounts.entity';

const tableOptions: TableOptions = { timestamp: true, tableName: 'Transactions' } as TableOptions;

@Table(tableOptions)
export class Transactions extends Model<Accounts> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public Amount: number;
  @ForeignKey(() => Accounts)
  public AccId: number;
  @BelongsTo(() => Accounts, {
      as: 'Accounts',
      foreignKey: 'AccId',
      targetKey: 'AccId',
  })
  public Account: Accounts;
  @CreatedAt
  public createdAt: Date;
}