export * from './redis.provider'
export * from './redis.service'

import { Module } from '@nestjs/common'
import { RedisProvider, RedisService } from '@redis'

@Module({
  providers: [RedisService, RedisProvider(1, 'REDIS_1')],
  exports: [RedisService]
})
export class RedisModule {}
