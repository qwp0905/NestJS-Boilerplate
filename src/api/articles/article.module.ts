import { Module } from '@nestjs/common'
import { ArticleCollection } from '../../models/mongo/article/article.model.module'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'

@Module({
  imports: [ArticleCollection],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
