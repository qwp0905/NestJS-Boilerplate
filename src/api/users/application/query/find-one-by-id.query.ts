import { IQuery } from '@nestjs/cqrs'

export class FindOneByIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
