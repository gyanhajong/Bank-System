import { Injectable, Inject, UseFilters } from '@nestjs/common';
import { Accounts } from './accounts.entity';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from './../../config/jwtConfig';
import crypto = require('crypto');

@Injectable()
export class AccountService {
    
    constructor(@Inject('ACCOUNTS_REPOSITORY') private accountRepository: typeof Accounts) {}
    
    public async create(account: any): Promise<object> {
        const existsAcc = await Accounts.findOne({ where: {AccName: account.AccName}});
        if(existsAcc) {
            throw new Error('Account Name already existing');
        } else {
            account.Salt = crypto.randomBytes(128).toString('base64');
            account.Password = crypto.createHmac('sha256', account.Password + account.Salt).digest('hex');
            const newAccount = await this.accountRepository.create<Accounts>(account);
            const payload = {
                AccName: newAccount.AccName,
                Email: newAccount.Email
            }
            const jwtToken = jwt.sign(payload, process.env.JWT_KEY, jwtConfig);
            
            return {
                account: newAccount,
                Token: jwtToken
            };
        }
    }
}