import { ArrayKeys } from '@type'
import { FilterQuery, RegexOptions, UpdateQuery } from 'mongoose'

export interface QueryResult {
  fieldCount: number
  affectedRows: number
  insertId: number
  serverStatus: number
  warningCount: number
  message: string
  protocol41: boolean
  changedRows: number
}

export interface MongoQueryBuiler<T> {
  add: <M extends keyof T>(
    key: M,
    value: T[M] | undefined
  ) => MongoQueryBuiler<T>
  not: <M extends keyof T>(
    key: M,
    value: (T[M] extends string ? T[M] | RegExp : T[M]) | undefined
  ) => MongoQueryBuiler<T>
  gt: <M extends keyof T>(
    key: M,
    value: T[M] | undefined
  ) => MongoQueryBuiler<T>
  gte: <M extends keyof T>(
    key: M,
    value: T[M] | undefined
  ) => MongoQueryBuiler<T>
  lt: <M extends keyof T>(
    key: M,
    value: T[M] | undefined
  ) => MongoQueryBuiler<T>
  lte: <M extends keyof T>(
    key: M,
    value: T[M] | undefined
  ) => MongoQueryBuiler<T>
  exists: <M extends keyof T>(
    key: M,
    value: boolean | undefined
  ) => MongoQueryBuiler<T>
  regex: <M extends keyof T>(
    key: M,
    pattern: RegExp | undefined,
    options?: RegexOptions | undefined
  ) => MongoQueryBuiler<T>
  in: <M extends keyof T>(
    key: M,
    value: Array<T[M]> | undefined
  ) => MongoQueryBuiler<T>
  ne: <M extends keyof T>(key: M, value: T[M]) => MongoQueryBuiler<T>
  nin: <M extends keyof T>(
    key: M,
    value: Array<T[M]> | undefined
  ) => MongoQueryBuiler<T>
  or: (
    conditions:
      | { [P in keyof T]?: T[P] }
      | Array<{ [P in keyof T]?: T[P] }>
      | undefined
  ) => MongoQueryBuiler<T>
  and: (
    conditions:
      | { [P in keyof T]?: T[P] }
      | Array<{ [P in keyof T]?: T[P] }>
      | undefined
  ) => MongoQueryBuiler<T>
  nor: (
    conditions:
      | { [P in keyof T]?: T[P] }
      | Array<{ [P in keyof T]?: T[P] }>
      | undefined
  ) => MongoQueryBuiler<T>
  build: () => FilterQuery<T>
}

export interface MongoUpdateQueryBuilder<T> {
  set: <M extends keyof Omit<T, '_id'>>(
    key: M,
    value: T[M] | undefined
  ) => MongoUpdateQueryBuilder<T>
  unset: <M extends keyof Omit<T, '_id'>>(key: M) => MongoUpdateQueryBuilder<T>
  push: <M extends ArrayKeys<Omit<T, '_id'>>>(
    key: M,
    value: (T[M] extends Array<infer U> ? U | PushQuery<U> : never) | undefined
  ) => MongoUpdateQueryBuilder<T>
  build: () => UpdateQuery<T>
}

export interface RootQuerySelector<T> {
  $and: Array<FilterQuery<T>>
  $nor: Array<FilterQuery<T>>
  $or: Array<FilterQuery<T>>
}

export interface PushQuery<T> {
  $slice?: number
  $each: Array<T>
}
