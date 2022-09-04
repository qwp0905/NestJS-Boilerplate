import { Controller, Get, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { FindOneByIdQuery } from 'src/api/users/application/query/find-one-by-id.query'

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  getUser(@Query() id: number) {
    const query = new FindOneByIdQuery(id)
    return this.queryBus.execute(query)
  }
}
