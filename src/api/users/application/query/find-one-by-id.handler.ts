import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FindOneByIdQuery } from 'src/api/users/application/query/find-one-by-id.query'
import { FindOneByIdResult } from 'src/api/users/application/query/find-one-by-id.result'
import { UserQuery } from 'src/api/users/application/query/user.query'

@QueryHandler(FindOneByIdQuery)
export class FindOneByIdHandler
  implements IQueryHandler<FindOneByIdQuery, FindOneByIdResult>
{
  constructor(@Inject('user_query') private readonly userQuery: UserQuery) {}

  async execute(query: FindOneByIdQuery): Promise<FindOneByIdResult> {
    const user = await this.userQuery.findOneById(query.id)

    const result = new FindOneByIdResult()

    Object.keys(result).forEach((key) => {
      result[key] = user[key]
    })
    return result
  }
}
