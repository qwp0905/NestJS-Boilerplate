import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { SignaturePipe } from '../pipes/signature.pipe'

const GetSignature = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>()
    const key = request.headers['x-123123']
    return key
  }
)

export const Signature = () => GetSignature(SignaturePipe)
