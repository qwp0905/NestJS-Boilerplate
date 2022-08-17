import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import { Article, ArticleDocument } from '@models/mongo'

@Injectable()
export class ArticleModel {
  constructor(
    @InjectModel(Article.name, 'mongo')
    private readonly model: Model<ArticleDocument>
  ) {}

  async find(
    query: FilterQuery<ArticleDocument> = {},
    projection: ProjectionType<ArticleDocument> = {},
    options: QueryOptions<ArticleDocument> = {}
  ) {
    const target = await this.model.find(query, projection, options)

    return target
  }

  async updateOne(
    query: FilterQuery<ArticleDocument>,
    update_query: UpdateQuery<Article>
  ) {
    await this.model.updateOne(query, update_query)
    return true
  }

  async insertMay(documents: Array<Article>) {
    await this.model.insertMany(documents)
    return true
  }
}
