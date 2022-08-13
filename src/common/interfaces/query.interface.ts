import { ArrayKeys } from '@type'
import { FilterQuery, RegexOptions, UpdateQuery } from 'mongoose'

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

export interface IMongoQueryBuiler<T> {
  add: <M extends keyof T>(
    key: M,
    value: T[M] | undefined
  ) => IMongoQueryBuiler<T>
  not: <M extends keyof T>(
    key: M,
    value: (T[M] extends string ? T[M] | RegExp : T[M]) | undefined
  ) => IMongoQueryBuiler<T>
  gt: <M extends keyof T>(
    key: M,
    value: T[M] | undefined
  ) => IMongoQueryBuiler<T>
  gte: <M extends keyof T>(
    key: M,
    value: T[M] | undefined
  ) => IMongoQueryBuiler<T>
  lt: <M extends keyof T>(
    key: M,
    value: T[M] | undefined
  ) => IMongoQueryBuiler<T>
  lte: <M extends keyof T>(
    key: M,
    value: T[M] | undefined
  ) => IMongoQueryBuiler<T>
  exists: <M extends keyof T>(
    key: M,
    value: boolean | undefined
  ) => IMongoQueryBuiler<T>
  regex: <M extends keyof T>(
    key: M,
    pattern: RegExp | undefined,
    options?: RegexOptions | undefined
  ) => IMongoQueryBuiler<T>
  in: <M extends keyof T>(
    key: M,
    value: Array<T[M]> | undefined
  ) => IMongoQueryBuiler<T>
  ne: <M extends keyof T>(key: M, value: T[M]) => IMongoQueryBuiler<T>
  nin: <M extends keyof T>(
    key: M,
    value: Array<T[M]> | undefined
  ) => IMongoQueryBuiler<T>
  or: (
    conditions: FilterQuery<T> | Array<FilterQuery<T>> | undefined
  ) => IMongoQueryBuiler<T>
  and: (
    conditions: FilterQuery<T> | Array<FilterQuery<T>> | undefined
  ) => IMongoQueryBuiler<T>
  nor: (
    conditions: FilterQuery<T> | Array<FilterQuery<T>> | undefined
  ) => IMongoQueryBuiler<T>
  build: () => FilterQuery<T>
}

export interface IMongoUpdateQueryBuilder<T> {
  set: <M extends keyof Omit<T, '_id'>>(
    key: M,
    value: T[M] | undefined
  ) => IMongoUpdateQueryBuilder<T>
  unset: <M extends keyof Omit<T, '_id'>>(key: M) => IMongoUpdateQueryBuilder<T>
  push: <M extends ArrayKeys<Omit<T, '_id'>>>(
    key: M,
    value: (T[M] extends Array<infer U> ? U | IPushQuery<U> : never) | undefined
  ) => IMongoUpdateQueryBuilder<T>
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
