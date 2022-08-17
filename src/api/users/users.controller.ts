import { Controller } from '@nestjs/common'
import { UsersService } from '@services'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
}
