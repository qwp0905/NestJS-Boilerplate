import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { MysqlService } from '../../models/mysql/mysql.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly mysqlService: MysqlService,
    @Inject(REQUEST)
    private readonly request: Request
  ) {}
  async hi(any: any) {
    return any
  }
}
