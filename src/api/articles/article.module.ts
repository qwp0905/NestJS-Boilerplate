import { Module } from '@nestjs/common'
import { ArticleController } from '@api/articles/article.controller'
import { ArticleService } from '@api/articles/article.service'

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
