import {
  CipherGCM,
  createCipheriv,
  createDecipheriv,
  DecipherGCM,
  randomBytes
} from 'crypto'
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
} from './interfaces/query.interface'

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
      if (value === undefined || !Object.keys(value).length) return this
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

//! aes_key는 무조건 32자리!
export const decryptAES = (text: string, secret_key: string): string | null => {
  try {
    const text_to_buffer = Buffer.from(text, 'base64')
    const iv = text_to_buffer.slice(
      text_to_buffer.length - 32,
      text_to_buffer.length - 16
    )
    const auth_tag = text_to_buffer.slice(text_to_buffer.length - 16)
    const encrypted = text_to_buffer.slice(0, text_to_buffer.length - 32)

    const decipher: DecipherGCM = createDecipheriv(
      'aes-256-gcm',
      secret_key,
      iv
    )
    decipher.setAuthTag(auth_tag)
    const decrypted = decipher.update(encrypted, null, 'utf-8')

    return decrypted + decipher.final('utf-8')
  } catch {
    return null
  }
}

export const encryptAES = (text: string, secret_key: string): string => {
  const iv = randomBytes(16)
  const cipher: CipherGCM = createCipheriv('aes-256-gcm', secret_key, iv)

  const encrypted = cipher.update(text, 'utf-8')
  const final = cipher.final()
  return Buffer.concat([encrypted, final, iv, cipher.getAuthTag()]).toString(
    'base64'
  )
}
