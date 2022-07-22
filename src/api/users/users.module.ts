import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { HttpModule } from '@nestjs/axios'
import { MysqlModule } from '../../models/mysql/mysql.module'

@Module({
  imports: [HttpModule, MysqlModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
