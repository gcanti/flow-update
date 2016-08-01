function mergeObject(obj, fields) {
  var ret = Object.assign({}, obj);
  var changed = false;
  for (var k in fields) {
    if (fields.hasOwnProperty(k)) {
      var value = fields[k];
      changed = changed || obj[k] !== value;
      ret[k] = value;
    }
  }
  return changed ? ret : obj;
}

function mergeArray(arr, indexes, values) {
  var ret = arr.slice();
  var changed = false;
  for (var i = 0, len = values.length; i < len; i++) {
    var index = indexes[i];
    var value = values[i];
    changed = changed || arr[index] !== value;
    ret[index] = value;
  }
  return changed ? ret : arr;
}

function swapArray(arr, from, to) {
  if (from === to) {
    return arr;
  }
  return mergeArray(arr, [from, to], [arr[to], arr[from]]);
}

function spliceArray(arr, splices) {
  var len = splices.length;
  if (len === 0) {
    return arr;
  }
  var ret = arr.slice();
  for (var i = 0; i < len; i++) {
    var splice = splices[i];
    var start = splice.start;
    var deleteCount = splice.deleteCount;
    var items = splice.items || [];
    Array.prototype.splice.apply(ret, [start, deleteCount].concat(items));
  }
  return ret;
}

function mergeDictionary(dict, fields) {
  return mergeObject(dict, fields);
}

function removeDictionary(dict, keys) {
  var len = keys.length;
  if (len === 0) {
    return dict;
  }
  var ret = Object.assign({}, dict);
  var changed = false;
  for (var i = 0; i < len; i++) {
    var k = keys[i];
    if (ret.hasOwnProperty(k)) {
      delete ret[k];
      changed = true;
    }
  }
  return changed ? ret : dict;
}

module.exports = {
  mergeObject: mergeObject,
  mergeArray: mergeArray,
  swapArray: swapArray,
  spliceArray: spliceArray,
  mergeDictionary: mergeDictionary,
  removeDictionary: removeDictionary
};