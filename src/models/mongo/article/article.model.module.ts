import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ArticleModel } from './article.model'
import { Article, ArticleSchema } from './article.schema'

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Article.name, schema: ArticleSchema }],
      'mongo'
    )
  ],
  providers: [ArticleModel],
  exports: [ArticleModel]
})
export class ArticleModelModule {}
