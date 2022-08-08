import { Article, ArticleModel, ArticleSchema } from '@models/mongo'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

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
export class ArticleCollection {}
