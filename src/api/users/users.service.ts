import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}
}
