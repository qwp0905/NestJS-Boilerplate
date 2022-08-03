import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { CacheService } from '../../cache/cache.service'

@Injectable()
export class SignaturePipe implements PipeTransform {
  constructor(private readonly cacheService: CacheService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const timestamp = new Date().toISOString()
    const get = await this.cacheService.get(value)
    return { timestamp, get }
  }
}
