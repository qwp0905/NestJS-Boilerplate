import { Bulk, QueryKey, QueryValue, NotObject } from '@type'
import {
  Document,
  FilterQuery,
  QuerySelector,
  RegexOptions,
  UpdateQuery
} from 'mongoose'
import { CollationDocument } from 'typeorm'

export interface ISqlQueryResult {
  fieldCount: number
  affectedRows: number
  insertId: number
  serverStatus: number
  warningCount: number
  message: string
  protocol41: boolean
  changedRows: number
}

export interface IQueryBuilder<T> {
  add: <M extends QueryKey<T>>(
    key: M,
    value?: QueryValue<T, M>
  ) => IQueryBuilder<T>
  not: <M extends QueryKey<T>>(
    key: M,
    value?: QueryValue<T, M> extends string
      ? QueryValue<T, M> | RegExp
      : QueryValue<T, M>
  ) => IQueryBuilder<T>
  gt: <M extends QueryKey<T>>(
    key: M,
    value?: QueryValue<T, M>
  ) => IQueryBuilder<T>
  gte: <M extends QueryKey<T>>(
    key: M,
    value?: QueryValue<T, M>
  ) => IQueryBuilder<T>
  lt: <M extends QueryKey<T>>(
    key: M,
    value?: QueryValue<T, M>
  ) => IQueryBuilder<T>
  lte: <M extends QueryKey<T>>(
    key: M,
    value?: QueryValue<T, M>
  ) => IQueryBuilder<T>
  exists: <M extends QueryKey<T>>(key: M, value?: boolean) => IQueryBuilder<T>
  regex: <M extends QueryKey<T>>(
    key: QueryValue<T, M> extends string ? M : never,
    pattern?: RegExp,
    options?: RegexOptions
  ) => IQueryBuilder<T>
  in: <M extends QueryKey<T>>(
    key: M,
    value?: Array<QueryValue<T, M>>
  ) => IQueryBuilder<T>
  ne: <M extends QueryKey<T>>(
    key: M,
    value?: QueryValue<T, M>
  ) => IQueryBuilder<T>
  nin: <M extends QueryKey<T>>(
    key: M,
    value?: Array<QueryValue<T, M>>
  ) => IQueryBuilder<T>
  all: <M extends QueryKey<T>>(
    key: M,
    value?: QueryValue<T, M> extends Array<infer U> ? U[] : never
  ) => IQueryBuilder<T>
  size: <M extends QueryKey<T>>(
    key: M,
    value?: QueryValue<T, M> extends any[] ? number : never
  ) => IQueryBuilder<T>
  elemMatch: <M extends QueryKey<T>>(
    key: M,
    value?: QueryValue<T, M> extends Array<infer U>
      ? U extends NotObject
        ? U extends Array<infer K>
          ? { $size?: number; $all?: K[]; $elemMatch?: any }
          : QuerySelector<U>
        : FilterQuery<U>
      : never
  ) => IQueryBuilder<T>
  or: (conditions?: FilterQuery<T> | Array<FilterQuery<T>>) => IQueryBuilder<T>
  and: (conditions?: FilterQuery<T> | Array<FilterQuery<T>>) => IQueryBuilder<T>
  nor: (conditions?: FilterQuery<T> | Array<FilterQuery<T>>) => IQueryBuilder<T>
  build: () => FilterQuery<T>
}

export interface IUpdateQueryBuilder<T> {
  set: <M extends QueryKey<Omit<T, '_id'>>>(
    key: M,
    value?: QueryValue<Omit<T, '_id'>, M>
  ) => IUpdateQueryBuilder<T>
  unset: <M extends QueryKey<Omit<T, '_id'>>>(key: M) => IUpdateQueryBuilder<T>
  push: <M extends QueryKey<Omit<T, '_id'>>>(
    key: M,
    value?: QueryValue<Omit<T, '_id'>, M> extends Array<infer U>
      ? U | IPushQuery<U>
      : never
  ) => IUpdateQueryBuilder<T>
  pop: <M extends QueryKey<Omit<T, '_id'>>>(
    key: M,
    value?: QueryValue<Omit<T, '_id'>, M> extends any[] ? 1 | -1 : never
  ) => IUpdateQueryBuilder<T>
  pull: <M extends QueryKey<T>>(
    key: M,
    value: FilterQuery<M>
  ) => IUpdateQueryBuilder<T>
  build: () => UpdateQuery<T>
}

export interface IRootQuerySelector<T> {
  $and: Array<FilterQuery<T>>
  $nor: Array<FilterQuery<T>>
  $or: Array<FilterQuery<T>>
}

export interface IPushQuery<T> {
  $slice?: number
  $each: Array<T>
  $sort?: T extends string | number
    ? 1 | -1
    : T extends any[]
    ? never
    : { [P in QueryKey<T>]?: 1 | -1 }
  $position?: number
}

export interface IInsertOneOption<T> {
  document: T
}

export interface IReplaceOneOption<T> {
  filter: FilterQuery<T>
  replacement: Omit<T, '_id'>
  collation?: CollationDocument
  hint?: string | Document
  upsert?: boolean
}

export interface IUpdateOneOption<T> {
  filter: FilterQuery<T>
  update: UpdateQuery<T> | UpdateQuery<T>[]
  upsert?: boolean
  collation?: CollationDocument
  arrayFilters?: Document[]
  hint?: string | Document
}

export interface IUpdateManyOption<T> {
  filter: FilterQuery<T>
  update: UpdateQuery<T> | UpdateQuery<T>[]
  arrayFilters?: Document[]
  collation?: CollationDocument
  hint?: string | Document
  upsert?: boolean
}

export interface IDeleteOneOption<T> {
  filter: FilterQuery<T>
  collation?: CollationDocument
  hint?: string | Document
}

export interface IDeleteManyOption<T> {
  filter: FilterQuery<T>
  collation?: CollationDocument
  hint?: string | Document
}

export interface IBulkBuilder<T extends Document> {
  insertOne: (document: T) => IBulkBuilder<T>
  replaceOne: (options: IReplaceOneOption<T>) => IBulkBuilder<T>
  updateOne: (options: IUpdateOneOption<T>) => IBulkBuilder<T>
  updateMany: (options: IUpdateManyOption<T>) => IBulkBuilder<T>
  deleteOne: (options: IDeleteOneOption<T>) => IBulkBuilder<T>
  deleteMany: (options: IDeleteManyOption<T>) => IBulkBuilder<T>
  build: () => Bulk<T>[]
}

export interface IAggregateBuilder<T> {
  match: (query: FilterQuery<T>) => IAggregateBuilder<T>
  addFields: <M extends QueryKey<T>, P extends string>(
    options: P extends M ? never : Record<P, Fields<T>>
  ) => IAggregateBuilder<T>
}

interface Fields<T> {
  $sum?: `$${QueryKey<T>}` | number | Array<`$${QueryKey<T>}` | number>
  $add?: `$${QueryKey<T>}`[]
}
