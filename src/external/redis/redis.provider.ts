import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import IORedis from 'ioredis'
import { Redis } from 'ioredis'

export const RedisProvider = (id: number, name: string): Provider => ({
  inject: [ConfigService],
  useFactory: (configService: ConfigService): Redis => {
    return new IORedis({
      host: configService.get<string>('REDIS_HOST'),
      port: 6379,
      db: id
    })
  },
  provide: name
})
