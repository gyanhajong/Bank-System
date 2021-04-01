import { Module } from '@nestjs/common';
import { TransactionsModule } from '../transactions/transactions.module';
import { AccountsController } from './account.controller'
import { AccountService } from './account.service';
import { AccountsProvider } from './accounts.provider';

@Module({
    controllers: [AccountsController],
    imports: [TransactionsModule],
    providers: [AccountsProvider, AccountService],
    exports: [
        AccountService,
        AccountsProvider,
    ]
})
export class AccountModule {}
