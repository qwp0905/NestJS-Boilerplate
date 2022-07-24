import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserRepository } from './user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([User], 'MySQL')],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UserTable {}
