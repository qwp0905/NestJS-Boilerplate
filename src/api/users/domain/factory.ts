import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'
import { UserImplement, UserProperties } from 'src/api/users/domain/user'

export class UserFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher
  ) {}

  reconstitute(properties: UserProperties) {
    return this.eventPublisher.mergeObjectContext(new UserImplement(properties))
  }
}
