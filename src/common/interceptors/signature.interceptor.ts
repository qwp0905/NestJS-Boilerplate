import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { CacheService } from '../../cache/cache.service'

@Injectable()
export class SignatureInterceptor implements NestInterceptor {
  constructor(private readonly cacheService: CacheService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Promise<Observable<any>> {
    await this.cacheService.set('signature', '123123')

    return next.handle()
  }
}
