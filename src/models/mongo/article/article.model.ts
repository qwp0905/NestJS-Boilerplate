import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose'
import { Article, ArticleDocument } from './article.schema'

@Injectable()
export class ArticleModel {
  constructor(
    @InjectModel(Article.name, 'mongo')
    private readonly model_secondary: Model<ArticleDocument>
  ) {}

  async find(
    query: FilterQuery<ArticleDocument> = {},
    projection: ProjectionType<ArticleDocument> = {},
    options: QueryOptions = {}
  ) {
    const target = await this.model_secondary.find(query, projection, options)
    return target
  }
}
