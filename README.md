Statically type checked model updates using Flow

# Motivation

There's a [ton of packages](https://github.com/search?utf8=✓&q=immutable+update) that help to update nested objects and arrays in a declarative and immutable manner, their APIs are focused on being ergonomic for a dynamic language though.

This package trades a bit of ergonomicity in favour of a suitable API for a static type checker.

# Usage

```js
// @flow

import { mergeObject, mergeArray, swapArray, spliceArray, removeDictionary } from './flow-update'

type Person = {
  name: string,
  age: number,
  hobbies?: {
    surf: boolean,
    climbing: boolean
  }
};

const person1: Person = { name: 'Giulio', age: 42 }

mergeObject(person1, {
  hobbies: mergeObject(person1.hobbies || {}, {
    surf: true,
    climbing: false
    //climbing: 1 // <= error
  })
})

const arr: Array<number> = [1, 2, 3]

mergeArray(arr, [1], [10])
// mergeArray(arr, ['a'], [10]) // <= error

swapArray(arr, 0, 1)
// swapArray(arr, 0, 'a') // <= error

const myFish: Array<string> = ['angel', 'clown', 'mandarin', 'surgeon']

spliceArray(myFish, [{ start: 2, deleteCount: 0, items: ['drum'] }])
// spliceArray(myFish, [{ start: 2, deleteCount: 0, items: [1] }]) // <= error

spliceArray(myFish, [{ start: 3, deleteCount: 2 }])

type K = 'a' | 'b';
const dict: {[key: K]: number} = {a: 1, b: 2}

mergeDictionary(dict, { a: 1 })
// mergeDictionary(dict, { a: 'a' }) // <= error
// mergeDictionary(dict, { c: 1 }) // <= error

removeDictionary(dict, ['a'])
// removeDictionary(dict, ['a', 'c']) // <= error
```