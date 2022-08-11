import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T = any>(key: string): Promise<T> {
    return await this.cache.get<T>(key)
  }

  async set(key: string, value: any, ttl = 60 * 1000) {
    return await this.cache.set(key, value, { ttl })
  }
}
