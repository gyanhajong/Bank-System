import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import { TableOptions } from 'sequelize-typescript';
import * as EmailValidator from 'email-validator';
import { Transactions } from '../transactions/transactions.entity';


const tableOptions: TableOptions = { timestamp: false, tableName: 'accounts' } as TableOptions;

@Table(tableOptions)
export class Accounts extends Model<Accounts> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;
  @Column({
      type: DataType.CHAR(200),
      allowNull: false,
  })
  public AccName: string;
  @Column({
    type: DataType.CHAR(50),
    allowNull: false,
    validate: {
      isEmail: true,
      isValid: async (value: string, next: Function): Promise<any> => {
        if(!EmailValidator.validate(value.trim())) {
            const error = new Error('This email is invalid.');
            next(error);
        }
        next();
      },
      isUnique: async (value: string, next: Function): Promise<any> => {
        const exists = await Accounts.findOne({ where: { Email: value } });
        if (exists) {
          const error = new Error('This email is already used.');
          next(error);
        }
        next();
      }
    }
  })
  public Email: string;
  @Column({
    type: DataType.CHAR(250),
    allowNull: false,
  })
  public Password: string;
  @Column({
    type: DataType.CHAR(250),
    allowNull: true,
  })
  public Salt: string;
  @HasMany(() => Transactions, 'AccId')
  public transactions: Transactions[];
}