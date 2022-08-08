export * from './article.controller'
export * from './article.service'

import { Module } from '@nestjs/common'
import { ArticleController, ArticleService } from '@api'

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
