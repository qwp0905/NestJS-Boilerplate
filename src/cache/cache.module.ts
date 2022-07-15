import { CacheModule as CModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientOptions } from '@nestjs/microservices'
import * as redisStore from 'cache-manager-ioredis'
import { CacheService } from './cache.service'

@Module({
  imports: [
    CModule.registerAsync<ClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: 6379,
        db: 1,
        ttl: 3600 * 48
      })
    })
  ],
  providers: [CacheService]
})
export class CacheModule {}
