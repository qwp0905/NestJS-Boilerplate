export type ArrayField<T> = {
  [P in keyof T]: T[P] extends Array<any> ? P : never
}[keyof T]
