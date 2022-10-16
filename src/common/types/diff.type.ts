import { ISignature } from '@interfaces'

export type Diff<T> = any
// {
//   [P in Exclude<keyof T, '_diff'>]?: DiffData<T[P]>
// } & {
//   _bef_dt: string
// } & ISignature

export type DiffData<T> = any
// T extends (infer U)[]
//   ? DiffData<U>[]
//   : DiffType<T> | { [P in keyof T]?: DiffData<T[P]> }

export enum DiffType {
  created = 'created',
  updated_from = 'updated_from',
  updated_to = 'updated_to',
  deleted = 'deleted',
  unchanged = 'unchanged'
}
// | { created: T }
// | { updated_from: T; updated_to: T }
// | { deleted: T }
// | { unchanged: T }

export type DiffRule<T> = any
//  {
//   [P in keyof T]?: (a: T[P], b: T[P]) => DiffData<T[P]>
// }
