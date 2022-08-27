import { ISignature } from '@interfaces'

export type Diff<T> = {
  [P in Exclude<keyof T, '_diff'>]?: DiffData<T[P]>
} & {
  _bef_dt: string
} & ISignature

export type DiffData<T> = T extends (infer U)[]
  ? DiffData<U>[]
  : DiffType<T> | { [P in keyof T]?: DiffData<T[P]> }

export type DiffType<T> =
  | { created: T }
  | { updated_from: T; updated_to: T }
  | { deleted: T }
  | { unchanged: T }

export type DiffRule<T> = {
  [P in keyof T]?: (a: T[P], b: T[P]) => DiffData<T[P]>
}
