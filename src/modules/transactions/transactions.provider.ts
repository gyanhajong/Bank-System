import { Transactions } from './transactions.entity';

export const TransactionsProviders = {
  provide: 'TRANSACTIONS_REPOSITORY',
  useValue: Transactions
};