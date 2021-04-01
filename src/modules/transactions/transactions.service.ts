import { Injectable, Inject } from '@nestjs/common';
import { Transactions } from './transactions.entity';

@Injectable()
export class TransactionsService { 
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private transactionsRepository: typeof Transactions
  ) { }
  public async create(transaction: any): Promise<object> {
    const newTransaction: any = await this.transactionsRepository.create<Transactions>(transaction);
    return newTransaction;
  }
}