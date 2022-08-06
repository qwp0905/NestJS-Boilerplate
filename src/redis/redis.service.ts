import { Inject, Injectable } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_1') private readonly REDIS1: Redis) {}

  async setToRedis1(key: string, value: any, expires_in = 3600 * 48) {
    return await this.REDIS1.set(key, value, 'EX', expires_in)
  }

  async getFromRedis1(key: string) {
    return await this.REDIS1.get(key)
  }
}
