export * from './redis.provider'
export * from './redis.service'

import { DynamicModule, Module } from '@nestjs/common'
import { RedisService, RedisRootProvider, RedisFeatureProvider } from '@redis'

@Module({})
export class RedisModule {
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      providers: [RedisRootProvider(1, 'REDIS_1')]
    }
  }

  static forFeature(): DynamicModule {
    return {
      module: RedisModule,
      providers: [RedisService, ...RedisFeatureProvider],
      exports: [RedisService]
    }
  }
}
