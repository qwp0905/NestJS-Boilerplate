import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { MysqlService } from '../../models/mysql/mysql.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly mysqlService: MysqlService
  ) {}
  hi() {
    return this.mysqlService.selectOnUser()
  }
}
