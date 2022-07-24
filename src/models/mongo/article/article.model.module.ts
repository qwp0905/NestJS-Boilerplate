import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ArticleModel } from './article.model'
import { Article, ArticleSchema } from './article.schema'

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Article.name, schema: ArticleSchema }],
      'mongo'
    ),
    MongooseModule.forFeature(
      [{ name: Article.name, schema: ArticleSchema }],
      'mongo_1'
    )
  ],
  providers: [ArticleModel],
  exports: [ArticleModel]
})
export class ArticleCollection {}
