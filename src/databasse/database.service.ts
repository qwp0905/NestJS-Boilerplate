import { Inject, Injectable } from '@nestjs/common'
import { Connection } from 'mysql'

@Injectable()
export class DatabaseService {
  constructor(@Inject('sql') private readonly connection: Connection) {}

  query<T = any>(query_string: string, params = []): Promise<T> {
    return new Promise((resolve, reject) => {
      this.connection.query(query_string, params, (err, data, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}
