import { Inject, Injectable } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_1') private readonly REDIS: Redis) {}

  async set(key: string, value: any, expires_in = 3600 * 48) {
    await this.REDIS.set(key, value, 'EX', expires_in)
  }
}
