import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseConfig } from '@database/mongoose.config'
import { typeORMConfig } from '@database/typeorm.config'

@Module({
  imports: [
    MongooseModule.forRootAsync(MongooseConfig),
    TypeOrmModule.forRootAsync(typeORMConfig)
  ]
})
export class DatabaseModule {}
