import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { AccountModule } from './modules/account/account.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    DatabaseModule,
    AccountModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
