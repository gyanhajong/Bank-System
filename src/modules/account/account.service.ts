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

    public async login(credentials: any): Promise<object> {
        const account = await Accounts.findOne<Accounts>({
          where: { AccName: credentials.AccName },
          attributes: { exclude: ['createdAt'] }
        });
        // If account does not exist, we return with a failure
        if (!account) {
            return {
              success: false,
              message: 'Account does not exist.'
            }
        }
        // Check the password for the account
        const inputPassword = crypto.createHmac('sha256', credentials.Password + account.Salt.trim()).digest('hex');
        if (!(credentials.Password.trim() === inputPassword.trim())) {
            return {
              success: false,
              message: 'Password is not correct.'
            }
        }
        const payload = {
            AccName: account.AccName,
            Email: account.Email
        }
        const jwtToken = jwt.sign(payload, process.env.JWT_KEY, jwtConfig);
        const response = {
            account: {
              id: account.id,
              AccName: account.AccName.trim(),
              Email: account.Email.trim()
            },
            token: jwtToken,
            success: true,
        }
          return response;
    }
}