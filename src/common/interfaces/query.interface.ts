import { FilterQuery, RegexOptions, UpdateQuery } from 'mongoose'

export interface SqlQueryResult {
  fieldCount: number
  affectedRows: number
  insertId: number
  serverStatus: number
  warningCount: number
  message: string
  protocol41: boolean
  changedRows: number
}

export interface MongoQueryBuiler<T = any> {
  add: (key: keyof T, value: any) => MongoQueryBuiler<T>
  not: (key: keyof T, value: any) => MongoQueryBuiler<T>
  gt: (key: keyof T, value: any) => MongoQueryBuiler<T>
  gte: (key: keyof T, value: any) => MongoQueryBuiler<T>
  lt: (key: keyof T, value: any) => MongoQueryBuiler<T>
  lte: (key: keyof T, value: any) => MongoQueryBuiler<T>
  exists: (key: keyof T, value: boolean | undefined) => MongoQueryBuiler<T>
  regex: (
    key: keyof T,
    pattern: RegExp | undefined,
    options?: RegexOptions | undefined
  ) => MongoQueryBuiler<T>
  in: (key: keyof T, value: Array<any> | undefined) => MongoQueryBuiler<T>
  ne: (key: keyof T, value: Array<any> | undefined) => MongoQueryBuiler<T>
  nin: (key: keyof T, value: Array<any> | undefined) => MongoQueryBuiler<T>
  or: (conditions: Array<FilterQuery<T>> | undefined) => MongoQueryBuiler<T>
  and: (conditions: Array<FilterQuery<T>> | undefined) => MongoQueryBuiler<T>
  nor: (conditions: Array<FilterQuery<T>> | undefined) => MongoQueryBuiler<T>
  build: () => FilterQuery<T>
}

export interface MongoUpdateQueryBuilder<T> {
  set: (key: keyof T, value: any) => MongoUpdateQueryBuilder<T>
  unset: (key: keyof T, value: any) => MongoUpdateQueryBuilder<T>
  build: () => UpdateQuery<T>
}
