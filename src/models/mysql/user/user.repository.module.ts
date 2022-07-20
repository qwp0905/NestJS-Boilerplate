import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseModule } from '../../../databasse/database.module'
import { User } from './user.entity'
import { UserRepository } from './user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([User], 'MySQL'), DatabaseModule],
  providers: [UserRepository],
  exports: [UserRepository]
})
export class UserRepositoryModule {}
