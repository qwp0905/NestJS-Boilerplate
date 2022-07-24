import { FilterQuery, RegexOptions, UpdateQuery } from 'mongoose'
import { MongoQueryBuiler } from './interfaces/query.interface'

export const QueryBuilders = <T = any>(): MongoQueryBuiler => {
  let query: FilterQuery<T> = {}
  return {
    add(key: keyof T, value: any) {
      if (value === undefined || !value.length) return this
      query[key] = value
      return this
    },
    not(key: keyof T, value: any) {
      if (value === undefined) return this
      query = { ...query, [key]: { $not: value } }
      return this
    },
    gt(key: keyof T, value: any) {
      if (value === undefined) return this
      query = { ...query, [key]: { $gt: value } }
      return this
    },
    gte(key: keyof T, value: any) {
      if (value === undefined) return this
      query = { ...query, [key]: { $gte: value } }
      return this
    },
    lt(key: keyof T, value: any) {
      if (value === undefined) return this
      query = { ...query, [key]: { $lt: value } }
      return this
    },
    lte(key: keyof T, value: any) {
      if (value === undefined) return this
      query = { ...query, [key]: { $lte: value } }
      return this
    },
    exists(key: keyof T, value: boolean | undefined) {
      if (value === undefined) return this
      query = { ...query, [key]: { $exists: value } }
      return this
    },
    regex(
      key: keyof T,
      pattern: RegExp | undefined,
      options?: RegexOptions | undefined
    ) {
      if (!pattern) return this
      query = {
        ...query,
        [key]: { $regex: pattern, $options: options }
      }
      return this
    },
    in(key: keyof T, value: Array<any> | undefined) {
      if (value === undefined || !value.length) return this
      query = { ...query, [key]: { $in: value } }
      return this
    },
    ne(key: keyof T, value: Array<any> | undefined) {
      if (value === undefined || !value.length) return this
      query = { ...query, [key]: { $ne: value } }
      return this
    },
    nin(key: keyof T, value: Array<any> | undefined) {
      if (value === undefined || !value.length) return this
      query = { ...query, [key]: { $nin: value } }
      return this
    },
    or(conditions: Array<FilterQuery<T>> | undefined) {
      if (conditions === undefined || !conditions.length) return this
      query.$or = conditions
      return this
    },
    and(conditions: Array<FilterQuery<T>> | undefined) {
      if (conditions === undefined || !conditions.length) return this
      query.$and = conditions
      return this
    },
    nor(conditions: Array<FilterQuery<T>> | undefined) {
      if (conditions === undefined || !conditions.length) return this
      query.$nor = conditions
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
      if (value === undefined || !value.length) return this
      if (!query.$set) query.$set = {}
      query.$set[key] = value
      return this
    },
    unset(key: keyof T) {
      if (!query.$unset) query.$unset = {}
      query.$unset = { ...query.$unset, [key]: 1 }
      return this
    },
    build() {
      return query
    }
  }
}
