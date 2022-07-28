import {
  CacheModule as CModule,
  CacheModuleOptions,
  Module
} from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientOptions, Transport } from '@nestjs/microservices'
import * as redisStore from 'cache-manager-ioredis'
import { CacheService } from './cache.service'

@Module({
  imports: [
    CModule.registerAsync<ClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): CacheModuleOptions => ({
        transport: Transport.REDIS,
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: 6379,
        db: 1,
        ttl: 3600 * 48,
        isGlobal: true
      })
    })
  ],
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheModule {}
