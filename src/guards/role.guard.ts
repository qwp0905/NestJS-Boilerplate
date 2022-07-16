import { CanActivate, ExecutionContext, Headers } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { AuthService } from '../auth/auth.service'

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

    return this.validateRole(req, necessary_roles)
  }

  async validateRole(
    @Headers() headers: Record<string, any>,
    necessary_roles: Array<string>
  ): Promise<boolean> {
    if (!headers['AUTH']) {
      return false
    }

    return await this.authService.validateRole(headers['AUTH'], necessary_roles)
  }
}
