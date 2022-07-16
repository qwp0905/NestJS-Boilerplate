import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseConfig } from './mongoose.config'
import { MongooseConfig_1 } from './mongoose_1.config'
import { typeORMConfig } from './typeorm.config'

@Module({
  imports: [
    MongooseModule.forRootAsync(MongooseConfig),
    MongooseModule.forRootAsync(MongooseConfig_1),
    TypeOrmModule.forRootAsync(typeORMConfig)
  ]
})
export class DatabaseModule {}
