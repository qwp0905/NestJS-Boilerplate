import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import IORedis from 'ioredis'

const redis_map: Record<string, IORedis> = {}

export const RedisRootProvider = (id: number, name: string): Provider => {
  return {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      redis_map[name] = new IORedis({
        host: configService.get<string>('REDIS_HOST'),
        port: 6379,
        db: id
      })
    },
    provide: name + '_root'
  }
}

export const RedisFeatureProvider: Provider[] = Object.keys(redis_map).map(
  (name) => {
    return {
      provide: name,
      useFactory: (): IORedis => redis_map[name]
    }
  }
)
