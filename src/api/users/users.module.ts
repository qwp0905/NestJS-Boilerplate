import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
