import { Module } from '@nestjs/common'
import { ArticleModel } from '../../models/mongo/article/article.model'
import { ArticleCollection } from '../../models/mongo/article/article.schema'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'

@Module({
  imports: [ArticleCollection],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleModel]
})
export class ArticleModule {}
