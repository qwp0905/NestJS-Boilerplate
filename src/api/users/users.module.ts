import { Module } from '@nestjs/common'
import { UsersController } from '@api'
import { UserServiceModule } from '@services'

@Module({
  imports: [UserServiceModule],
  controllers: [UsersController]
})
export class UsersModule {}
