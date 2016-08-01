/* globals describe, it */
var assert = require('assert');
var u = require('../index');

describe('mergeObject', function () {

  it('should not change reference if no changes occur', function () {
    var o1 = {};
    var o2 = u.mergeObject(o1, {});
    assert.strictEqual(o1, o2);
  });

  it('should change reference changes occur', function () {
    var o1 = {};
    var o2 = u.mergeObject(o1, { a: 1 });
    assert.ok(o1 !== o2);
  });

  it('should update the object', function () {
    var o1 = { a: 1 };
    var o2 = u.mergeObject(o1, { a: 2, b: 3 });
    assert.deepEqual(o2, { a: 2, b: 3 });
  });

  it('should handle nested objects', function () {
    var o1 = { a: 1, b: {} };
    var o2 = u.mergeObject(o1, {
      b: u.mergeObject(o1.b, { c: 2 }),
      d: 1
    });
    assert.deepEqual(o2, { a: 1, b: { c: 2 }, d: 1 });
  });

});

describe('mergeArray', function () {

  it('should not change reference if no changes occur', function () {
    var a1 = [];
    var a2 = u.mergeArray(a1, [], []);
    assert.strictEqual(a1, a2);
  });

  it('should change reference changes occur', function () {
    var a1 = [];
    var a2 = u.mergeArray(a1, [0], [1]);
    assert.ok(a1 !== a2);
  });

  it('should update the array', function () {
    var a1 = [1];
    var a2 = u.mergeArray(a1, [1], [2]);
    assert.deepEqual(a2, [1, 2]);
  });

});

describe('swapArray', function () {

  it('should not change reference if no changes occur', function () {
    var a1 = [1, 2];
    var a2 = u.swapArray(a1, 0, 0);
    assert.strictEqual(a1, a2);
  });

  it('should change reference changes occur', function () {
    var a1 = [1, 2];
    var a2 = u.swapArray(a1, 0, 1);
    assert.ok(a1 !== a2);
  });

  it('should update the array', function () {
    var a1 = [1, 2];
    var a2 = u.swapArray(a1, 0, 1);
    assert.deepEqual(a2, [2, 1]);
  });

});

describe('spliceArray', function () {

  it('should not change reference if no changes occur', function () {
    var a1 = [1, 2];
    var a2 = u.spliceArray(a1, []);
    assert.strictEqual(a1, a2);
  });

  it('should change reference changes occur', function () {
    var a1 = ['angel', 'clown', 'mandarin', 'surgeon'];
    var a2 = u.spliceArray(a1, [{ start: 2, deleteCount: 0, items: ['drum'] }]);
    assert.ok(a1 !== a2);
  });

  it('should update the array', function () {
    var a1 = ['angel', 'clown', 'mandarin', 'surgeon'];
    var a2 = u.spliceArray(a1, [{ start: 2, deleteCount: 0, items: ['drum'] }]);
    assert.deepEqual(a2, [ 'angel', 'clown', 'drum', 'mandarin', 'surgeon' ]);
  });

});

describe('removeDictionary', function () {

  it('should not change reference if no changes occur', function () {
    var d1 = {};
    var d2 = u.removeDictionary(d1, []);
    assert.strictEqual(d1, d2);
    var d3 = u.removeDictionary(d1, ['a']);
    assert.strictEqual(d1, d3);
  });

  it('should change reference changes occur', function () {
    var d1 = { a: 1 };
    var d2 = u.removeDictionary(d1, ['a']);
    assert.ok(d1 !== d2);
  });

  it('should update the array', function () {
    var d1 = { a: 1 };
    var d2 = u.removeDictionary(d1, ['a']);
    assert.deepEqual(d2, {});
  });

});