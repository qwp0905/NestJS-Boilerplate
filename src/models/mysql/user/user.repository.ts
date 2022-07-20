import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseService } from '../../../databasse/database.service'
import { User } from './user.entity'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User, 'MySQL')
    private readonly repository: Repository<User>,
    private readonly SQL: DatabaseService
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
    const user = await this.SQL.query<User>(`SELECT * FROM User WHERE id = ?`, [
      id
    ])
    return user
  }
}
