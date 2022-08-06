import { User } from '@models/mysql/user/user.entity'
import { UserRepository } from '@models/mysql/user/user.repository'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User], 'MySQL')],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UserTable {}
