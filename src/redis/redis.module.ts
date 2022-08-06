import { Module } from '@nestjs/common'
import { RedisProvider } from '@redis/redis.provider'
import { RedisService } from '@redis/redis.service'

@Module({
  providers: [RedisService, RedisProvider(1, 'REDIS_1')],
  exports: [RedisService]
})
export class RedisModule {}
