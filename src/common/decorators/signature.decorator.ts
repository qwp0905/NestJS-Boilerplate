import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const Signature = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>()
    const key = request.headers['x-123123']
    const abc = request.url

    return { key, abc }
  }
)
