import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'
import { User } from './user/user.entity'

@Injectable()
export class MysqlService {
  constructor(
    @InjectEntityManager('MySQL') private readonly conn: EntityManager
  ) {}

  async selectOnUser() {
    const user: User = await this.conn.query(
      `SELECT Users.id,Article.id as article_id
        FROM Users
        LEFT JOIN Article on Users.id = Article.user_id
        WHERE Users.id = (?)`,
      [3]
    )
    return user
  }
}
