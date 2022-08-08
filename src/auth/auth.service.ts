import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User, UserRepository } from '@models/mysql'

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async validateUser({ email }: User): Promise<boolean> {
    if (!email) {
      throw new UnauthorizedException()
    }

    const user = await this.userRepository.findByEmail(email)

    return !!user
  }

  // async validateRole(
  //   key: string,
  //   necessary_roles: Array<string>
  // ): Promise<boolean> {
  //   const encrypted_id = await this.cacheService.get(key)
  //   if (!encrypted_id) {
  //     return false
  //   }
  //   // const id = verify(encrypted_user)

  //   const user = await this.userRepository.findById(12)

  //   if (!user) {
  //     return false
  //   }

  //   return necessary_roles.reduce<boolean>((total, necessary_role) => {
  //     const result = user.roles.reduce<boolean>((check, user_role) => {
  //       return !!~necessary_role.indexOf(user_role) || check
  //     }, false)
  //     return total && result
  //   }, true)
  // }
}
