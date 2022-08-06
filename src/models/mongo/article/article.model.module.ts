import { ArticleModel } from '@models/mongo/article/article.model'
import { Article, ArticleSchema } from '@models/mongo/article/article.schema'
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
