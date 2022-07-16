import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Role } from './decorators/auth.decorator'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Role(['role_name_1', 'role_name_2'])
  getHello(): string {
    return this.appService.getHello()
  }
}
