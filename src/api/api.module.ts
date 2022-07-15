import { Module } from '@nestjs/common'
import { ArticleModule } from './articles/article.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [AuthModule, ArticleModule, UsersModule]
})
export class ApiModule {}
