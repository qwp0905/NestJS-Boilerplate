import { Controller, Get } from '@nestjs/common'
import { Signature } from '../../common/decorators/signature.decorator'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/12312312312312')
  hi(@Signature() signature) {
    return signature
  }
}
