import { IQueryResult } from '@nestjs/cqrs'

export class FindOneByIdResult implements IQueryResult {
  readonly id: number
  readonly email: string
  statusMessage: string
  profileImage: string
}
