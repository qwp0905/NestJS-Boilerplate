import { ArticleModule } from '@api/articles/article.module'
import { UsersModule } from '@api/users/users.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [UsersModule, ArticleModule]
})
export class ApiModule {}
