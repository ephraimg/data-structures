var HashTable = function() {
  this._insertCount = 0;
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  for (var i = 0; i < this._limit; i++) {
    this._storage.set(i, []);
  }
};

HashTable.prototype.insert = function(k, v) {   
  var index = getIndexBelowMaxForKey(k, this._limit);
  var found = false;  
  //console.log(this._storage.get(index));   
  for (var i = 0; i < this._storage.get(index).length; i++) {
    if (this._storage.get(index)[i][0] === k) {
      this._storage.get(index)[i][1] = v;
      found = true;
    }
  }
  if (!found) {
    this._storage.get(index).push([k, v]);
    this._insertCount++;
  }
  this.doubleIfNeeded(); // ***
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      return bucket[i][1];
    }
  }
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  if (bucket !== undefined) {
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === k) {
        bucket.splice(i, 1);
        this._insertCount--;
      }
    }
  }
  this.halveIfNeeded(); // ***
};

HashTable.prototype.saveTuples = function() {
  var temp = [];
  this._storage.each((bucket, idx) => {
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        temp.push(bucket[i]);
      }
    }
  });
  return temp;
};

HashTable.prototype.refillFrom = function(array) {
  this._storage = LimitedArray(this._limit);
  this._insertCount = 0; // ***
  for (var i = 0; i < this._limit; i++) {
    this._storage.set(i, []);
  }
  for (let i = 0; i < array.length; i++) {
    this.insert(array[i][0], array[i][1]);
  }
};

HashTable.prototype.doubleIfNeeded = function() {
  if (this._insertCount / this._limit > 0.75) {
    var temp = this.saveTuples();
    this._limit = this._limit * 2; 
    this.refillFrom(temp);
  }
};

HashTable.prototype.halveIfNeeded = function() {
  if (this._insertCount / this._limit < 0.25) {
    var temp = this.saveTuples();
    this._limit = this._limit / 2; 
    this.refillFrom(temp);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


