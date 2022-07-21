import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { HttpModule } from '@nestjs/axios'
import { DataSourceModule } from '../../models/mysql/dataSource.module'

@Module({
  imports: [HttpModule, DataSourceModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
