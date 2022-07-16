import { Controller, Get } from '@nestjs/common'
import { Role } from './decorators/auth.decorator'

@Controller()
export class AppController {
  @Get()
  @Role(['role_name_1', 'role_name_2'])
  getHello(): string {
    return 'Hello World'
  }
}
