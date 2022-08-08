import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { AuthService } from '@auth'

export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    const necessary_roles = this.reflector.get<Array<string>>(
      'roles',
      context.getHandler()
    )

    if (!necessary_roles || !necessary_roles.length) {
      return true
    }
    return true
    // return this.validateRole(req, necessary_roles)
  }

  // async validateRole(
  //   @Headers('AUTH') auth_key: string,
  //   necessary_roles: Array<string>
  // ): Promise<boolean> {
  //   if (!auth_key) {
  //     return false
  //   }

  //   return await this.authService.validateRole(auth_key, necessary_roles)
  // }
}
