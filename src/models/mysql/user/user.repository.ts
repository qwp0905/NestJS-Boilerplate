import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection } from 'mysql'
import { Repository } from 'typeorm'
import { query } from '../../../common/util'
import { User } from './user.entity'

@Injectable()
export class UserRepository {
  private readonly table = 'User'
  constructor(
    @InjectRepository(User, 'MySQL')
    private readonly repository: Repository<User>,
    @Inject('sql')
    private readonly SQL: Connection
  ) {}
  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id } })
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } })
    return user
  }

  async findByIdQuery(id: number): Promise<User> {
    const user = await query<User>(
      this.SQL,
      `SELECT * FROM ${this.table} WHERE id = (?)`,
      [id]
    )
    return user
  }
}
