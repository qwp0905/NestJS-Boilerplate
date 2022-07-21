import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { User } from './user/user.entity'

@Injectable()
export class DataSourceService {
  constructor(@InjectDataSource('MySQL') private readonly conn: DataSource) {}

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
