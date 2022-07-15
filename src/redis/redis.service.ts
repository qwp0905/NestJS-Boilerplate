import { Inject, Injectable } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_1') private readonly REDIS: Redis) {}
}
