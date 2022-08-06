import { Controller } from '@nestjs/common'
import { UsersService } from '@api/users/users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
}
