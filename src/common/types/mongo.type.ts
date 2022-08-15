import {
  IDeleteManyOption,
  IDeleteOneOption,
  IInsertOneOption,
  IReplaceOneOption,
  IUpdateManyOption,
  IUpdateOneOption
} from '@interfaces'
import { NotObject, Join } from '@type'

export type Bulk<T> =
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

export type QueryKey<T> =
  | { [P in keyof T]: P extends symbol ? never : P }[keyof T]
  | {
      [P in keyof T]: T[P] extends NotObject
        ? never
        : Join<
            P extends symbol ? never : P,
            { [K in keyof T[P]]: K extends symbol ? never : K }[keyof T[P]]
          >
    }[keyof T]
  | {
      [P in keyof T]: T[P] extends NotObject
        ? never
        : Join<
            P extends symbol ? never : P,
            {
              [K in keyof T[P]]: T[P][K] extends NotObject
                ? never
                : Join<
                    K extends symbol ? never : K,
                    {
                      [U in keyof T[P][K]]: U extends symbol ? never : U
                    }[keyof T[P][K]]
                  >
            }[keyof T[P]]
          >
    }[keyof T]

export type QueryValue<T, K extends QueryKey<T>> = K extends keyof T
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
