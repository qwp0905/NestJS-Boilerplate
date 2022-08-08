export * from './mongoose.config'
export * from './typeorm.config'

import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseConfig, typeORMConfig } from '@database'

@Module({
  imports: [
    MongooseModule.forRootAsync(MongooseConfig),
    TypeOrmModule.forRootAsync(typeORMConfig)
  ]
})
export class DatabaseModule {}
