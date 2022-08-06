import { Module } from '@nestjs/common'
import { UsersService } from '@api/users/users.service'
import { UsersController } from '@api/users/users.controller'

@Module({
  imports: [],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
