import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AccountService } from './account.service';
import { IAccount } from './interface/account.interface';

@Controller('accounts')
export class UsersController {
  constructor(private accountService: AccountService) { }
  @Post('register')  
    public async register(@Body() account: IAccount): Promise<any> {    
    const result: any = await this.accountService.create(account,);
    if (!result.success) {
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
    }
    return result;  
  }
}