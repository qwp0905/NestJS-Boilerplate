import { applyDecorators, Get } from '@nestjs/common'
import { R } from './response.decorator'

export const GET = (path?: string): MethodDecorator => {
  return applyDecorators(R(), Get(path))
}
