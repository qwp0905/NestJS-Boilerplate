import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../../models/mysql/user/user.repository'

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userRepository: UserRepository
  ) {}
}
