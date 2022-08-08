import { User, UserRepository } from '@models/mysql'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User], 'MySQL')],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UserTable {}
