import { Module } from '@nestjs/common';
import { AccountsService } from '../transactions/transactions.service';
import { AccountsController } from './account.controller'
import { AccountService } from './account.service';
import { AccountsProvider } from './accounts.provider';

@Module({
    controllers: [AccountsController],
    providers: [AccountsProvider, AccountService],
    exports: [
        AccountsService,
        AccountsProvider,
    ]
})
export class AccountModule {}
