import { UserProperties } from 'src/api/users/domain/user'

export interface UserQuery {
  findOneById: (id: number) => Promise<UserProperties>
}
