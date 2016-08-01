declare module 'flow-update' {

  declare type Splice<T> = {
    start: number,
    deleteCount: number,
    items?: Array<T>
  };

  declare function mergeObject<T: Object>(obj: T, fields: $Shape<T>): T;

  declare function mergeArray<T>(arr: Array<T>, indexes: Array<number>, values: Array<T>): Array<T>;

  declare function swapArray<T>(arr: Array<T>, from: number, to: number): Array<T>;

  declare function spliceArray<T>(arr: Array<T>, splices: Array<Splice<T>>): Array<T>;

  declare function mergeDictionary<K, V>(dict: {[key: K]: V}, fields: {[key: K]: V}): {[key: K]: V};

  declare function removeDictionary<K, V>(dict: {[key: K]: V}, keys: Array<K>): {[key: K]: V};

}