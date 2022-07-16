import { Module } from '@nestjs/common'
import { ArticleModule } from './articles/article.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [ArticleModule, UsersModule]
})
export class ApiModule {}
