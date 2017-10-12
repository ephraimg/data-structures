var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = {};
  return set;
};

var setPrototype = {};

setPrototype.add = function(item) {
  this._storage[item] = item;
};

setPrototype.contains = function(item) {
  return this._storage[item] !== undefined; 
};

setPrototype.remove = function(item) {
  this._storage[item] = undefined;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
