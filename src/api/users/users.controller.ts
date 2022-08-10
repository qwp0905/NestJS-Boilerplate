import { Controller, Get } from '@nestjs/common'
import { UsersService } from '@api'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
}
