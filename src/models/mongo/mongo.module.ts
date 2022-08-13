import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoService } from '@models/mongo'

@Module({
  imports: [MongooseModule.forFeature([], 'mongo')],
  providers: [MongoService],
  exports: [MongoService]
})
export class MongoModule {}
