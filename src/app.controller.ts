import { Controller } from '@nestjs/common'
import { GET } from './decorators/api.decorator'
import { Role } from './decorators/auth.decorator'

@Controller()
export class AppController {
  @GET()
  @Role(['role_name_1', 'role_name_2'])
  getHello(): string {
    return 'Hello World'
  }
}
