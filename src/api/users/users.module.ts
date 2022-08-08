import { Module } from '@nestjs/common'
import { UsersService, UsersController } from '@api'

@Module({
  imports: [],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
