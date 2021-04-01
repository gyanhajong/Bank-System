import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TransactionsProviders } from './transactions.provider';
import { TransactionsService } from './transactions.service'

@Module({
    imports: [DatabaseModule],
    providers: [TransactionsProviders,TransactionsService],
    exports: [TransactionsProviders,TransactionsService]
})
export class TransactionsModule {}
