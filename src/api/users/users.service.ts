import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { CacheService } from '../../cache/cache.service'
import { MysqlService } from '../../models/mysql/mysql.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly mysqlService: MysqlService,
    private readonly cacheService: CacheService
  ) {}
  async hi() {
    return await this.cacheService.get('signature')
  }
}
