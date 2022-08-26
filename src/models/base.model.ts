import {
  Document,
  FilterQuery,
  HydratedDocument,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import { from, Observable } from 'rxjs'

export class BaseModel<TDocument extends Document> {
  constructor(protected readonly model: Model<TDocument>) {}

  async findOne(
    query: FilterQuery<TDocument> = {},
    projection: ProjectionType<TDocument> = {},
    options: QueryOptions<TDocument> = {}
  ): Promise<TDocument> {
    const result = await this.model.findOne(query, projection, options)
    return result
  }

  findAll(
    query: FilterQuery<TDocument> = {},
    projection: ProjectionType<TDocument> = {},
    options: QueryOptions<TDocument> = {}
  ): Observable<HydratedDocument<TDocument>> {
    const result = this.model.find(query, projection, options).cursor()

    return from(result)
  }

  async insertMany(documents: TDocument[]) {
    await this.model.insertMany(documents)
    return true
  }

  async updateOne(
    filter_query: FilterQuery<TDocument>,
    update_query: UpdateQuery<TDocument>,
    options: QueryOptions<TDocument> = {}
  ) {
    await this.model.updateOne(filter_query, update_query, options)
    return true
  }

  async updateMany(
    filter_query: FilterQuery<TDocument>,
    update_query: UpdateQuery<TDocument>,
    options: QueryOptions<TDocument> = {}
  ) {
    await this.model.updateMany(filter_query, update_query, options)
    return true
  }

  async bulkWrite(bulk: any[]) {
    await this.model.bulkWrite(bulk)
  }
}
