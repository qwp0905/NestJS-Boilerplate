import {
  IDeleteManyOption,
  IDeleteOneOption,
  IInsertOneOption,
  IReplaceOneOption,
  IUpdateManyOption,
  IUpdateOneOption
} from '@interfaces'
import { Document } from 'mongoose'
import { Key, NotObject } from '@type'

export type Bulk<T extends Document> =
  | {
      insertOne: IInsertOneOption<T>
    }
  | {
      replaceOne: IReplaceOneOption<T>
    }
  | {
      updateOne: IUpdateOneOption<T>
    }
  | {
      updateMany: IUpdateManyOption<T>
    }
  | {
      deleteOne: IDeleteOneOption<T>
    }
  | {
      deleteMany: IDeleteManyOption<T>
    }

export type MongoKey<T> =
  | keyof T
  | {
      [P in keyof T]: T[P] extends NotObject
        ? never
        : Join<P extends string ? P : never, Key<T[P]>>
    }[keyof T]
  | {
      [P in keyof T]: T[P] extends NotObject
        ? never
        : Join<
            P extends string ? P : never,
            {
              [K in keyof T[P]]: T[P][K] extends NotObject
                ? never
                : Join<K extends string ? K : never, Key<T[P][K]>>
            }[keyof T[P]]
          >
    }[keyof T]

export type Join<T extends string, P extends string> = `${T}.${P}`

export type MongoValue<T, K extends MongoKey<T>> = K extends keyof T
  ? T[K]
  : K extends `${infer K1}.${infer K2}`
  ? K1 extends keyof T
    ? K2 extends keyof T[K1]
      ? T[K1][K2]
      : never
    : never
  : K extends `${infer K1}.${infer K2}.${infer K3}`
  ? K1 extends keyof T
    ? K2 extends keyof T[K1]
      ? K3 extends keyof T[K1][K2]
        ? T[K1][K2][K3]
        : never
      : never
    : never
  : never
