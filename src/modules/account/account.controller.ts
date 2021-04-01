import { Controller, Post, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AccountService } from './account.service';
import { IAccount } from './interface/account.interface';

@Controller('accounts')
export class AccountsController {
  constructor(private accountService: AccountService) { }
  @Post('register')  
  public async register(@Body() account: IAccount): Promise<any> {    
    const result: any = await this.accountService.create(account,);
    if (!result.success) {
        throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
    }
    return result;  
  }
  @Post('login')
  public async login(@Res() res, @Body() credentials: any): Promise<any> {
    const result: any = await this.accountService.login(credentials);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return res.status(HttpStatus.OK).json(result);
  }
}