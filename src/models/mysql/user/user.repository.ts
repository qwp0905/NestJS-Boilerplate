import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserRepository extends Repository<User> {
  async findById(id: number): Promise<User> {
    const user = await this.findOne({ where: { id } })
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.findOne({ where: { email } })
    return user
  }
}
