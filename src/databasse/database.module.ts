import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseConfig } from './mongoose.config'
import { typeORMConfig } from './typeorm.config'

@Module({
  imports: [
    MongooseModule.forRootAsync(MongooseConfig),
    TypeOrmModule.forRootAsync(typeORMConfig)
  ]
})
export class DatabaseModule {}
