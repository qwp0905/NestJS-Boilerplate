import { Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserFactory } from 'src/api/users/domain/factory'
import { UserRepository } from 'src/api/users/domain/repository'
import { User } from 'src/api/users/domain/user'
import { UserEntity } from 'src/api/users/infrastructure/entity/user.entity'
import { Repository } from 'typeorm'

export class UserRepositoryImplement implements UserRepository {
  constructor(
    @Inject(UserFactory) private readonly userFactory: UserFactory,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findOneById(id: number): Promise<User> {
    const entity = await this.userRepository.findOne({ where: { id } })
    return this.entityToModel(entity)
  }

  private entityToModel(entity: UserEntity): User {
    return this.userFactory.reconstitute(entity)
  }
}
