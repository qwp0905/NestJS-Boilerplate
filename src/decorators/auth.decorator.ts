import { applyDecorators, UseGuards } from '@nestjs/common'
import { BasicGuard } from '../guards/basic.guard'

export function Auth(): MethodDecorator {
  return applyDecorators(UseGuards(BasicGuard))
}
