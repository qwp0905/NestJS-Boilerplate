import { Connection } from 'mysql'

export function query<T = any>(
  connection: Connection,
  query_string: string,
  params = []
): Promise<T> {
  return new Promise((resolve, reject) => {
    connection.query(query_string, params, (err, data, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
