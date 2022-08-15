export type ArrayKeys<T> = {
  [P in keyof T]: T[P] extends Array<any> ? P : never
}[keyof T]

export type StringKeys<T> = {
  [P in keyof T]: T[P] extends string ? P : never
}[keyof T]

export type NotObject =
  | string
  | number
  | boolean
  | Date
  | RegExp
  | Buffer
  | Uint8Array
  | ((...args: any[]) => any)
  | {
      _bsontype: string
    }
  | any[]

export type Join<
  T extends string | number,
  P extends string | number
> = `${T}.${P}`
