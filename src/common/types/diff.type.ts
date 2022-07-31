export type Diff<T> = {
  [P in Exclude<keyof T, '_diff'>]?: DiffData<T[P]>
} & {
  _ts: number
  _dt: string
  _bef_dt: string
  _name: string
  _uid: string
  _at: string
}

export type DiffData<T> =
  | { [P in DiffType]?: T }
  | { [P in keyof T]?: DiffData<T[P]> }

export enum DiffType {
  created = 'created',
  updated_from = 'updated_from',
  updated_to = 'updated_to',
  deleted = 'deleted',
  unchanged = 'unchanged'
}
