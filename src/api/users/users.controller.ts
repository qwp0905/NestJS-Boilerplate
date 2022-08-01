import { Controller, Get } from '@nestjs/common'
import { Signature } from '../../common/decorators/signature.decorator'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Signature()
  hi() {
    return this.userService.hi()
  }
}
