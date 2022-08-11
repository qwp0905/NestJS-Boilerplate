import {
  Condition,
  FilterQuery,
  QuerySelector,
  RegexOptions,
  UpdateQuery
} from 'mongoose'
import {
  MongoQueryBuiler,
  MongoUpdateQueryBuilder,
  PushQuery,
  RootQuerySelector
} from '@interfaces'
import { ArrayKeys } from '@type'

export const QueryBuilder = <T>(): MongoQueryBuiler<T> => {
  const query: FilterQuery<T> = {}
  const setKey = <K extends keyof T>(
    key: K,
    tag: keyof QuerySelector<T[K]>,
    value: any
  ) => {
    if (value === undefined) return
    if (Array.isArray(value) && !value.length) return
    const condition: Condition<T> = {}
    if (!query[key]) query[key] = condition
    query[key][tag] = value
  }
  const setCondition = (
    tag: keyof RootQuerySelector<T>,
    condition: FilterQuery<T> | Array<FilterQuery<T>>
  ) => {
    if (!condition || !Object.keys(condition).length) return
    if (!query[tag]) query[tag] = []
    if (Array.isArray(condition)) {
      query[tag] = [...query[tag], ...condition]
    } else {
      query[tag].push(condition)
    }
  }
  return {
    add<M extends keyof T>(key: M, value: T[M] | undefined) {
      if (value === undefined) return this
      if (Array.isArray(value) && !value.length) return this
      query[key] = value
      return this
    },
    not<M extends keyof T>(
      key: M,
      value: (T[M] extends string ? T[M] | RegExp : T[M]) | undefined
    ) {
      setKey(key, '$not', value)
      return this
    },
    gt<M extends keyof T>(key: M, value: T[M] | undefined) {
      setKey(key, '$gt', value)
      return this
    },
    gte<M extends keyof T>(key: M, value: T[M] | undefined) {
      setKey(key, '$gte', value)
      return this
    },
    lt<M extends keyof T>(key: M, value: T[M] | undefined) {
      setKey(key, '$lt', value)
      return this
    },
    lte<M extends keyof T>(key: M, value: T[M] | undefined) {
      setKey(key, '$lte', value)
      return this
    },
    exists(key: keyof T, value: boolean | undefined) {
      setKey(key, '$exists', value)
      return this
    },
    regex(
      key: keyof T,
      pattern: RegExp | undefined,
      options?: RegexOptions | undefined
    ) {
      setKey(key, '$regex', pattern)
      if (options) setKey(key, '$options', options)
      return this
    },
    in<M extends keyof T>(key: M, value: Array<T[M]> | undefined) {
      setKey(key, '$in', value)
      return this
    },
    ne<M extends keyof T>(key: M, value: T[M] | undefined) {
      setKey(key, '$ne', value)
      return this
    },
    nin<M extends keyof T>(key: M, value: Array<T[M]> | undefined) {
      setKey(key, '$nin', value)
      return this
    },
    or(
      conditions:
        | { [P in keyof T]?: T[P] }
        | Array<{ [P in keyof T]?: T[P] }>
        | undefined
    ) {
      setCondition('$or', conditions)
      return this
    },
    and(
      conditions:
        | { [P in keyof T]?: T[P] }
        | Array<{ [P in keyof T]?: T[P] }>
        | undefined
    ) {
      setCondition('$and', conditions)
      return this
    },
    nor(
      conditions:
        | { [P in keyof T]?: T[P] }
        | Array<{ [P in keyof T]?: T[P] }>
        | undefined
    ) {
      setCondition('$nor', conditions)
      return this
    },
    build() {
      return query
    }
  }
}

export const UpdateQueryBuilder = <T>(): MongoUpdateQueryBuilder<T> => {
  const query: UpdateQuery<T> = {}
  return {
    set<M extends keyof Omit<T, '_id'>>(key: M, value: T[M]) {
      if (
        value === undefined ||
        (typeof value === 'object' && !Object.keys(value).length)
      ) {
        return this
      }
      if (!query.$set) query.$set = {}
      query.$set[key] = value
      return this
    },
    unset<M extends keyof Omit<T, '_id'>>(key: M) {
      if (!query.$unset) query.$unset = {}
      query.$unset = { ...query.$unset, [key]: 1 }
      return this
    },
    push<M extends ArrayKeys<T>>(
      key: M,
      value: T[M] extends Array<infer U> ? U | PushQuery<U> : never
    ) {
      if (!query.$push) query.$push = {}
      query.$push = { ...query.$push, [key]: value }
      return this
    },
    build() {
      return query
    }
  }
}
