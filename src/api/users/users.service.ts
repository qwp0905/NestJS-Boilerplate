import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { DataSourceService } from '../../models/mysql/dataSource.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataSource: DataSourceService
  ) {}
  hi() {
    return this.dataSource.selectOnUser()
  }
}
