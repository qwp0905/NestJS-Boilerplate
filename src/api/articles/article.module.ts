export * from './article.controller'

import { Module } from '@nestjs/common'
import { ArticleController } from '@api'
import { ArticleServiceModule } from '@services'

@Module({
  imports: [ArticleServiceModule],
  controllers: [ArticleController]
})
export class ArticleModule {}
