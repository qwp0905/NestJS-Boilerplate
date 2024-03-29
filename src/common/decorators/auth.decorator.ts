import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { RoleGuard } from '@guards'

export function Role(roles: Array<string>): MethodDecorator {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RoleGuard))
}
