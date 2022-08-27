import { Diff, DiffData, DiffRule, DiffType } from '@type'

export const deepDiff = <T>(
  obj1: Partial<T> | T,
  obj2: Partial<T> | T,
  rule: DiffRule<T>,
  projection: { [P in keyof T]?: 1 }
): Diff<T> => {
  return
}

const compare = <T>(a: T, b: T): DiffData<T> => {
  if (Array.isArray(a)) {
    if (b === undefined) {
      return a.map((e) => {
        return { deleted: e }
      })
    }
  }
  if (typeof a === 'object' && typeof b === 'object') {
  }
}
