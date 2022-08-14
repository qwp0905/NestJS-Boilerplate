import { ArrayKeys, Bulk, StringKeys } from '@type'
import { Document, FilterQuery, RegexOptions, UpdateQuery } from 'mongoose'
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

export interface IQueryBuiler<T> {
  add: <M extends keyof T>(key: M, value?: T[M]) => IQueryBuiler<T>
  not: <M extends keyof T>(
    key: M,
    value?: T[M] extends string ? T[M] | RegExp : T[M]
  ) => IQueryBuiler<T>
  gt: <M extends keyof T>(key: M, value?: T[M]) => IQueryBuiler<T>
  gte: <M extends keyof T>(key: M, value?: T[M]) => IQueryBuiler<T>
  lt: <M extends keyof T>(key: M, value?: T[M]) => IQueryBuiler<T>
  lte: <M extends keyof T>(key: M, value?: T[M]) => IQueryBuiler<T>
  exists: <M extends keyof T>(key: M, value?: boolean) => IQueryBuiler<T>
  regex: <M extends StringKeys<T>>(
    key: M,
    pattern?: RegExp,
    options?: RegexOptions
  ) => IQueryBuiler<T>
  in: <M extends keyof T>(key: M, value?: Array<T[M]>) => IQueryBuiler<T>
  ne: <M extends keyof T>(key: M, value?: T[M]) => IQueryBuiler<T>
  nin: <M extends keyof T>(key: M, value?: Array<T[M]>) => IQueryBuiler<T>
  or: (conditions?: FilterQuery<T> | Array<FilterQuery<T>>) => IQueryBuiler<T>
  and: (conditions?: FilterQuery<T> | Array<FilterQuery<T>>) => IQueryBuiler<T>
  nor: (conditions?: FilterQuery<T> | Array<FilterQuery<T>>) => IQueryBuiler<T>
  build: () => FilterQuery<T>
}

export interface IUpdateQueryBuilder<T> {
  set: <M extends keyof Omit<T, '_id'>>(
    key: M,
    value?: T[M]
  ) => IUpdateQueryBuilder<T>
  unset: <M extends keyof Omit<T, '_id'>>(key: M) => IUpdateQueryBuilder<T>
  push: <M extends ArrayKeys<Omit<T, '_id'>>>(
    key: M,
    value?: T[M] extends Array<infer U> ? U | IPushQuery<U> : never
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
