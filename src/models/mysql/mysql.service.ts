import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'
import { User } from '@models/mysql'

@Injectable()
export class MysqlService {
  constructor(
    @InjectEntityManager('MySQL') private readonly entityManager: EntityManager
  ) {}

  async selectOnUser() {
    const user: User = await this.entityManager.query(
      `SELECT Users.id,COUNT(
        SELECT id FROM articles
          WHERE articles.user_id = Users.id
      ).id as articles
        FROM Users
        WHERE Users.id = (?)`,
      [3]
    )
    return user
  }
}
