// @flow
export function mergeObject<T: Object>(obj: T, fields: $Shape<T>): T {
  const ret = Object.assign({}, obj)
  let changed = false
  for (const k in fields) {
    if (fields.hasOwnProperty(k)) {
      const value = fields[k]
      changed = changed || obj[k] !== value
      ret[k] = value
    }
  }
  return changed ? ret : obj
}

export function mergeArray<T>(arr: Array<T>, indexes: Array<number>, values: Array<T>): Array<T> {
  const ret = arr.slice()
  let changed = false
  for (let i = 0, len = values.length; i < len; i++) {
    const index = indexes[i]
    const value = values[i]
    changed = changed || arr[index] !== value
    ret[index] = value
  }
  return changed ? ret : arr
}

export function swapArray<T>(arr: Array<T>, from: number, to: number): Array<T> {
  if (from === to) {
    return arr
  }
  return mergeArray(arr, [from, to], [arr[to], arr[from]])
}

export type Splice<T> = {
  start: number,
  deleteCount: number,
  items?: Array<T>
};

export function spliceArray<T>(arr: Array<T>, splices: Array<Splice<T>>) {
  const len = splices.length
  if (len === 0) {
    return arr
  }
  const ret = arr.slice()
  for (let i = 0; i < len; i++) {
    const { start, deleteCount, items = [] } = splices[i]
    ret.splice(start, deleteCount, ...items)
  }
  return ret
}

export function mergeDictionary<K, V>(dict: {[key: K]: V}, fields: {[key: K]: V}): {[key: K]: V} {
  return mergeObject(dict, fields)
}

export function removeDictionary<K, V>(dict: {[key: K]: V}, keys: Array<K>): {[key: K]: V} {
  const len = keys.length
  if (len === 0) {
    return dict
  }
  const ret: {[key: K]: V} = Object.assign({}, dict)
  let changed = false
  for (let i = 0; i < len; i++) {
    const k = keys[i]
    if (ret.hasOwnProperty(k)) {
      delete ret[k]
      changed = true
    }
  }
  return changed ? ret : dict
}
