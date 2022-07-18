import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { map, Observable } from 'rxjs'

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const res = context.switchToHttp().getResponse()
    return next.handle().pipe(
      map((data) => {
        res.json({ result: true, data })
      })
    )
  }
}
