import { DiffData, DiffType } from '../types/diff.type'

export const deepDiff = {
  VALUE_CREATED: DiffType.created,
  VALUE_UPDATED: DiffType.updated_from,
  VALUE_DELETED: DiffType.deleted,
  VALUE_UNCHANGED: DiffType.unchanged,
  map: function <T>(
    obj1: T,
    obj2: T,
    rule = {},
    projection: Partial<Record<keyof T, 1>> | Array<keyof T> = {}
  ): DiffData<T> {
    // projection : mongodb like, 비교대상을 한정한다
    if (Array.isArray(projection)) {
      // projection 이 key array 로 왔다면 1인 object 로 바꿔준다 (ex:['key1', 'key2'] => {key1:1, key2:1})
      const pMap: Partial<Record<keyof T, 1>> = {}
      projection.forEach((k) => (pMap[k] = 1))
      projection = pMap
    }
    // 1, true 등이 하나라도 있다면 projection 에 표시되지 않은 다른 값들은 0 이다
    const projectionHasTrue = Object.values(projection).some((v) => v)
    /**
     * rule, project 는 최초 object에 한해 적용(no recursive)
     */
    if (this.isFunction(obj1) || this.isFunction(obj2)) {
      throw 'Invalid argument. Function given, object expected.'
    }
    if (this.isValue(obj1) || this.isValue(obj2)) {
      const comp = this.compareValues(obj1, obj2)
      if (comp === this.VALUE_UNCHANGED) {
        return null
      } else if (comp === this.VALUE_UPDATED) {
        return { updated_from: obj1, updated_to: obj2 }
      } else {
        return { [comp]: obj1 === undefined ? obj2 : obj1 }
      }
    }

    const diff: DiffData<T> = {}
    Object.keys(obj1)
      .filter(
        (k) =>
          projection[k] || (!projectionHasTrue && projection[k] === undefined)
      )
      .forEach((key) => {
        if (
          ~'_id,_ts,_dt,_cdt'.split(',').indexOf(key) ||
          this.isFunction(obj1[key])
        ) {
          return
        }
        const value2 = obj2[key] !== undefined ? obj2[key] : undefined
        if (rule[key]) {
          diff[key] = rule[key](obj1[key], value2, this)
        } else {
          diff[key] = this.map(obj1[key], value2)
        }
      })
    Object.keys(obj2)
      .filter(
        (k) =>
          projection[k] || (!projectionHasTrue && projection[k] === undefined)
      )
      .forEach((key) => {
        if (
          ~'_id,_ts,_dt,_cdt'.split(',').indexOf(key) ||
          this.isFunction(obj2[key]) ||
          diff[key] !== undefined
        ) {
          return
        }
        if (rule[key]) {
          diff[key] = rule[key](undefined, obj2[key], this)
        } else {
          diff[key] = this.map(undefined, obj2[key])
        }
      })
    Object.keys(diff).forEach((k) => {
      if (
        diff[k] === null ||
        (this.isObject(diff[k]) && Object.keys(diff[k]).length === 0) ||
        (this.isArray(diff[k]) && diff[k].length === 0)
      )
        delete diff[k]
    })

    return diff
  },
  compareValues: function (value1: any, value2: any): DiffType {
    if (value1 === value2) {
      return this.VALUE_UNCHANGED
    }
    if (value1 == null && value2 == null) {
      return this.VALUE_UNCHANGED
    }
    if (
      this.isDate(value1) &&
      this.isDate(value2) &&
      value1.getTime() === value2.getTime()
    ) {
      return this.VALUE_UNCHANGED
    }
    if (value1 === undefined) {
      return this.VALUE_CREATED
    }
    if (value2 === undefined) {
      return this.VALUE_DELETED
    }
    return this.VALUE_UPDATED
  },
  isFunction: function (x: any): boolean {
    return Object.prototype.toString.call(x) === '[object Function]'
  },
  isArray: function (x: any): boolean {
    return Object.prototype.toString.call(x) === '[object Array]'
  },
  isDate: function (x: any): boolean {
    return Object.prototype.toString.call(x) === '[object Date]'
  },
  isObject: function (x: any): boolean {
    return Object.prototype.toString.call(x) === '[object Object]'
  },
  isValue: function (x: any): boolean {
    return !this.isObject(x) && !this.isArray(x)
  }
}
