import { User } from 'src/api/users/domain/user'

export interface UserRepository {
  findOneById: (id: number) => Promise<User>
}
