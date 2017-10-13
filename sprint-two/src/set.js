var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = {};
  return set;
};

var setPrototype = {};

setPrototype.add = function(item) {
  if (typeof item === 'function') {
    this._storage[item.toString()] = item;
  } else {
    this._storage[JSON.stringify(item)] = item;
  }
};

setPrototype.contains = function(item) {
  if (typeof item === 'function') {
    return this._storage[item.toString()] !== undefined;
  } else {
    return this._storage[JSON.stringify(item)] !== undefined;
  }
};

setPrototype.remove = function(item) {
  if (typeof item === 'function') {
    this._storage[item.toString()] = undefined;
  } else {
    this._storage[JSON.stringify(item)] = undefined;
  }
  
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
