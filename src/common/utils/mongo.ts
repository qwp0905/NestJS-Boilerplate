import {
  Condition,
  Document,
  FilterQuery,
  QuerySelector,
  UpdateQuery
} from 'mongoose'
import {
  IQueryBuiler,
  IUpdateQueryBuilder,
  IRootQuerySelector,
  IReplaceOneOption,
  IBulkBuilder
} from '@interfaces'
import { Bulk, MongoKey, MongoValue } from '@type'

export const QueryBuilder = <T>(): IQueryBuiler<T> => {
  let query: FilterQuery<T> = {}

  const setKey = <K extends MongoKey<T>>(
    key: K,
    tag: keyof QuerySelector<MongoValue<T, K>>,
    value: any
  ) => {
    if (value === undefined) return
    if (Array.isArray(value) && !value.length) return
    const condition: Condition<T> = {}
    if (!query[key]) query[key] = condition
    query[key][tag] = value
  }

  const setCondition = (
    tag: keyof IRootQuerySelector<T>,
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
    add(key, value) {
      if (value === undefined) return this
      if (Array.isArray(value) && !value.length) return this
      query = { ...query, [key]: value }
      return this
    },
    not(key, value) {
      setKey(key, '$not', value)
      return this
    },
    gt(key, value) {
      setKey(key, '$gt', value)
      return this
    },
    gte(key, value) {
      setKey(key, '$gte', value)
      return this
    },
    lt(key, value) {
      setKey(key, '$lt', value)
      return this
    },
    lte(key, value) {
      setKey(key, '$lte', value)
      return this
    },
    exists(key, value) {
      setKey(key, '$exists', value)
      return this
    },
    regex(key, pattern, options) {
      setKey(key, '$regex', pattern)
      if (options) setKey(key, '$options', options)
      return this
    },
    in(key, value) {
      setKey(key, '$in', value)
      return this
    },
    ne(key, value) {
      setKey(key, '$ne', value)
      return this
    },
    nin(key, value) {
      setKey(key, '$nin', value)
      return this
    },
    or(conditions) {
      setCondition('$or', conditions)
      return this
    },
    and(conditions) {
      setCondition('$and', conditions)
      return this
    },
    nor(conditions) {
      setCondition('$nor', conditions)
      return this
    },
    build() {
      return query
    }
  }
}

export const UpdateQueryBuilder = <T>(): IUpdateQueryBuilder<T> => {
  const query: UpdateQuery<T> = {}
  return {
    set(key, value) {
      if (
        value === undefined ||
        (typeof value === 'object' && !Object.keys(value).length)
      ) {
        return this
      }
      if (!query.$set) query.$set = {}
      query.$set = { ...query.$set, [key]: value }
      return this
    },
    unset(key) {
      if (!query.$unset) query.$unset = {}
      query.$unset = { ...query.$unset, [key]: 1 }
      return this
    },
    push(key, value) {
      if (
        value === undefined ||
        (typeof value === 'object' && !Object.keys(value).length)
      ) {
        return this
      }
      if (!query.$push) query.$push = {}
      query.$push = { ...query.$push, [key]: value }
      return this
    },
    build() {
      return query
    }
  }
}

export const BulkBuilder = <T extends Document>(): IBulkBuilder<T> => {
  const bulk: Bulk<T>[] = []
  return {
    insertOne(document: T) {
      bulk.push({ insertOne: { document } })
      return this
    },
    replaceOne(options: IReplaceOneOption<T>) {
      bulk.push({ replaceOne: options })
      return this
    },
    updateOne(options) {
      bulk.push({ updateOne: options })
      return this
    },
    updateMany(options) {
      bulk.push({ updateMany: options })
      return this
    },
    deleteOne(options) {
      bulk.push({ deleteOne: options })
      return this
    },
    deleteMany(options) {
      bulk.push({ deleteMany: options })
      return this
    },
    build() {
      return bulk
    }
  }
}
