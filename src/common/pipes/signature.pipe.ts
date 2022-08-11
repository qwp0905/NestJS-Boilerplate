import { Injectable, PipeTransform } from '@nestjs/common'
import { RedisService } from 'src/external/redis/redis.module'

@Injectable()
export class SignaturePipe implements PipeTransform {
  constructor(private readonly redisService: RedisService) {}
  async transform({ key, _at }: any) {
    const timestamp = new Date().toISOString()
    const get = await this.redisService.getFromRedis1(key)
    return { timestamp, get, _at }
  }
}
