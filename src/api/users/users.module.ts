import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { HttpModule } from '@nestjs/axios'
import { UserRepositoryModule } from '../../models/mysql/user/user.repository.module'

@Module({
  imports: [HttpModule, UserRepositoryModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
