/* globals describe, it */
import assert from 'assert'
import * as u from '../src/index'

describe('mergeObject', function () {

  it('should not change reference if no changes occur', () => {
    const o1 = {}
    const o2 = u.mergeObject(o1, {})
    assert.strictEqual(o1, o2)
  })

  it('should change reference changes occur', () => {
    const o1 = {}
    const o2 = u.mergeObject(o1, { a: 1 })
    assert.ok(o1 !== o2)
  })

  it('should update the object', () => {
    const o1 = { a: 1 }
    const o2 = u.mergeObject(o1, { a: 2, b: 3 })
    assert.deepEqual(o2, { a: 2, b: 3 })
  })

  it('should handle nested objects', () => {
    const o1 = { a: 1, b: {} }
    const o2 = u.mergeObject(o1, {
      b: u.mergeObject(o1.b, { c: 2 }),
      d: 1
    })
    assert.deepEqual(o2, { a: 1, b: { c: 2 }, d: 1 })
  })

})

describe('mergeArray', function () {

  it('should not change reference if no changes occur', () => {
    const a1 = []
    const a2 = u.mergeArray(a1, [], [])
    assert.strictEqual(a1, a2)
  })

  it('should change reference changes occur', () => {
    const a1 = []
    const a2 = u.mergeArray(a1, [0], [1])
    assert.ok(a1 !== a2)
  })

  it('should update the array', () => {
    const a1 = [1]
    const a2 = u.mergeArray(a1, [1], [2])
    assert.deepEqual(a2, [1, 2])
  })

})

describe('swapArray', () => {

  it('should not change reference if no changes occur', () => {
    const a1 = [1, 2]
    const a2 = u.swapArray(a1, 0, 0)
    assert.strictEqual(a1, a2)
  })

  it('should change reference changes occur', () => {
    const a1 = [1, 2]
    const a2 = u.swapArray(a1, 0, 1)
    assert.ok(a1 !== a2)
  })

  it('should update the array', function () {
    const a1 = [1, 2]
    const a2 = u.swapArray(a1, 0, 1)
    assert.deepEqual(a2, [2, 1])
  })

})

describe('spliceArray', () => {

  it('should not change reference if no changes occur', () => {
    const a1 = [1, 2]
    const a2 = u.spliceArray(a1, [])
    assert.strictEqual(a1, a2)
  })

  it('should change reference changes occur', () => {
    const a1 = ['angel', 'clown', 'mandarin', 'surgeon']
    const a2 = u.spliceArray(a1, [{ start: 2, deleteCount: 0, items: ['drum'] }])
    assert.ok(a1 !== a2)
  })

  it('should update the array', () => {
    const a1 = ['angel', 'clown', 'mandarin', 'surgeon']
    const a2 = u.spliceArray(a1, [{ start: 2, deleteCount: 0, items: ['drum'] }])
    assert.deepEqual(a2, [ 'angel', 'clown', 'drum', 'mandarin', 'surgeon' ])
  })

})

describe('removeDictionary', () => {

  it('should not change reference if no changes occur', () => {
    const d1 = {}
    const d2 = u.removeDictionary(d1, [])
    assert.strictEqual(d1, d2)
    const d3 = u.removeDictionary(d1, ['a'])
    assert.strictEqual(d1, d3)
  })

  it('should change reference changes occur', () => {
    const d1 = { a: 1 }
    const d2 = u.removeDictionary(d1, ['a'])
    assert.ok(d1 !== d2)
  })

  it('should update the array', () => {
    const d1 = { a: 1 }
    const d2 = u.removeDictionary(d1, ['a'])
    assert.deepEqual(d2, {})
  })

})
