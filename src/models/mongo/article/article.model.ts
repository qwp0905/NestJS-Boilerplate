import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import { Article, ArticleDocument } from './article.schema'

@Injectable()
export class ArticleModel {
  constructor(
    @InjectModel(Article.name, 'mongo')
    private readonly model_secondary: Model<ArticleDocument>,
    @InjectModel(Article.name, 'mongo_1')
    private readonly model: Model<ArticleDocument>
  ) {}

  async find(
    query: FilterQuery<ArticleDocument> = {},
    projection: ProjectionType<ArticleDocument> = {},
    options: QueryOptions = {}
  ) {
    const target = await this.model_secondary.find(query, projection, options)
    return target
  }

  async updateOne(
    query: FilterQuery<ArticleDocument>,
    update_query: UpdateQuery<ArticleDocument>
  ) {
    await this.model.updateOne(query, update_query)
    return true
  }
}
