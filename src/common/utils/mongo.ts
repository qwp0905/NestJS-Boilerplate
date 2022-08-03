import {
  Condition,
  FilterQuery,
  QuerySelector,
  RegexOptions,
  UpdateQuery
} from 'mongoose'
import {
  MongoQueryBuiler,
  RootQuerySelector
} from '../interfaces/query.interface'

export const QueryBuilders = <T = any>(): MongoQueryBuiler<T> => {
  const query: FilterQuery<T> = {}
  const setKey = (key: keyof T, tag: keyof QuerySelector<T>, value: any) => {
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
    add(key: keyof T, value: any) {
      if (value === undefined) return this
      if (Array.isArray(value) && !value.length) return this
      query[key] = value
      return this
    },
    not(key: keyof T, value: any) {
      setKey(key, '$not', value)
      return this
    },
    gt(key: keyof T, value: any) {
      setKey(key, '$gt', value)
      return this
    },
    gte(key: keyof T, value: any) {
      setKey(key, '$gte', value)
      return this
    },
    lt(key: keyof T, value: any) {
      setKey(key, '$lt', value)
      return this
    },
    lte(key: keyof T, value: any) {
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
    in(key: keyof T, value: Array<any> | undefined) {
      setKey(key, '$in', value)
      return this
    },
    ne(key: keyof T, value: any | undefined) {
      setKey(key, '$ne', value)
      return this
    },
    nin(key: keyof T, value: Array<any> | undefined) {
      setKey(key, '$nin', value)
      return this
    },
    or(conditions: FilterQuery<T> | Array<FilterQuery<T>> | undefined) {
      setCondition('$or', conditions)
      return this
    },
    and(conditions: FilterQuery<T> | Array<FilterQuery<T>> | undefined) {
      setCondition('$and', conditions)
      return this
    },
    nor(conditions: FilterQuery<T> | Array<FilterQuery<T>> | undefined) {
      setCondition('$nor', conditions)
      return this
    },
    build() {
      return query
    }
  }
}

export const UpdateQueryBuilder = <T = any>() => {
  const query: UpdateQuery<T> = {}
  return {
    set(key: keyof T, value: any) {
      if (
        value === undefined ||
        (typeof value === 'object' && !Object.keys(value).length)
      )
        return this
      if (!query.$set) query.$set = {}
      query.$set[key] = value
      return this
    },
    unset(key: keyof T) {
      if (!query.$unset) query.$unset = []
      query.$unset.push(key)
      return this
    },
    build() {
      return query
    }
  }
}
