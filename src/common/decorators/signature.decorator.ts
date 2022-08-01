import { applyDecorators, UseInterceptors } from '@nestjs/common'
import { SignatureInterceptor } from '../interceptors/signature.interceptor'

export const Signature = () => {
  return applyDecorators(UseInterceptors(SignatureInterceptor))
}
