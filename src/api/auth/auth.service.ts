import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../models/mysql/user/user.entity'
import { UserRepository } from '../../models/mysql/user/user.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository, 'MySQL')
    private readonly userRepository: UserRepository
  ) {}
  async validateUser({ email }: User): Promise<boolean> {
    if (!email) {
      throw new UnauthorizedException()
    }

    const user = await this.userRepository.findByEmail(email)

    return !!user
  }
}
