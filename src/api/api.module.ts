export * from './articles/article.controller'
export * from './articles/article.module'

export * from './users/users.controller'
export * from './users/users.module'

import { ArticleModule, UsersModule } from '@api'
import { Module } from '@nestjs/common'

@Module({
  imports: [UsersModule, ArticleModule]
})
export class ApiModule {}
