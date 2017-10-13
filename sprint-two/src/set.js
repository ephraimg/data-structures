var Set = function() {
  var set = Object.create(setPrototype);
  set._ht = new ShashTable();
  return set;
};

var setPrototype = {};

setPrototype.size = function() {
  return this._ht._insertCount;
};

setPrototype.makeKey = function(item) {
  return typeof item === 'function' ? 
    item.toString() : JSON.stringify(item);  
};

setPrototype.add = function(item) {
  var key = this.makeKey(item);
  return this._ht.insert(item, key);
};

setPrototype.remove = function(item) {
  var key = this.makeKey(item);
  this._ht.remove(item, key);
};

setPrototype.contains = function(item) {
  var key = this.makeKey(item);
  var index = getIndexBelowMaxForKey(key, this._ht._limit);
  var bucket = this._ht._storage.get(index);  
  return bucket === undefined ?
    false : bucket.includes(item);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
 
var ShashTable = function() {
  this._insertCount = 0;
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

ShashTable.prototype.insert = function(item, key) {
  this.doubleIfNeeded(); 
  var index = getIndexBelowMaxForKey(key, this._limit);
  var bucket = this._storage.get(index);
  if (bucket === undefined) {
    this._storage.set(index, []); // [] is our bucket
    bucket = this._storage.get(index);
  }
  if (!bucket.includes(item)) {
    bucket.push(item);
    this._insertCount++;
  } else {
    return false;
  }
};

ShashTable.prototype.remove = function(item, key) {
  this.halveIfNeeded();
  var index = getIndexBelowMaxForKey(key, this._limit);
  var bucket = this._storage.get(index);
  if (bucket !== undefined) {
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i] === item) {
        bucket.splice(i, 1);
        this._insertCount--;
      }
    }
  }
};

ShashTable.prototype.doubleIfNeeded = function() {
  if (this._insertCount / this._limit >= 0.75) {
    var temp = [];
    this._storage.each(bucket => {
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          temp.push(bucket[i]);
        }
      }
    });
    this._limit = this._limit * 2;
    this._storage = LimitedArray(this._limit);
    this._insertCount = 0;
    for (let i = 0; i < temp.length; i++) {
      this.insert(temp[i][0], temp[i][1]);
    } 
  }
};

ShashTable.prototype.halveIfNeeded = function() {
  if (this._insertCount / this._limit <= 0.25) {
    var temp = [];
    this._storage.each(bucket => {
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          temp.push(bucket[i]);
        }
      }
    });
    this._limit = this._limit / 2;
    this._storage = LimitedArray(this._limit);
    this._insertCount = 0;
    for (let i = 0; i < temp.length; i++) {
      this.insert(temp[i][0], temp[i][1]);
    }
  }
};
