import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  MongooseModuleAsyncOptions,
  MongooseModuleFactoryOptions
} from '@nestjs/mongoose'

export const MongooseConfig_1: MongooseModuleAsyncOptions = {
  connectionName: 'mongo_1',
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService
  ): Promise<MongooseModuleFactoryOptions> => ({
    uri: configService.get<string>('URI_1'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoCreate: false
  })
}
