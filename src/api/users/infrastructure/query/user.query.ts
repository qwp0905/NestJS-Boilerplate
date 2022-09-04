import { InjectRepository } from '@nestjs/typeorm'
import { UserQuery } from 'src/api/users/application/query/user.query'
import { UserProperties } from 'src/api/users/domain/user'
import { UserEntity } from 'src/api/users/infrastructure/entity/user.entity'
import { Repository } from 'typeorm'

export class UserQueryImplement implements UserQuery {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async findOneById(id: number): Promise<UserProperties> {
    const user = await this.repository.findOne({ where: { id } })
    return user
  }
}
