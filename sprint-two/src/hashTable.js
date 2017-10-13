

var HashTable = function() {
  this._insertCount = 0;
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  
  // will need to do this again when resizing
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
    this._storage.get(index).push([k, v]); // now bucket should be [[k, v]]
    this._insertCount++;
  }
  if (this.needsDoubling()) { this.double(); }
};


















// HashTable.prototype.insert = function(k, v) {
  
//   if (this.needsDoubling()) { this.double(); } 
  
//   var index = getIndexBelowMaxForKey(k, this._limit);
//   var bucket = this._storage.get(index);
//   if (bucket === undefined) {
//     this._storage.set(index, []); // [] is our bucket
//     bucket = this._storage.get(index);
//   }
//   var found = false;
//   for (var i = 0; i < bucket.length; i++) {
//     if (bucket[i][0] === k) {
//       bucket[i][1] = v;
//       found = true;
//     }
//   }
//   if (!found) {
//     bucket.push([k, v]); // now bucket should be [[k, v]]
//     //console.log('insert bucket: ', JSON.stringify(bucket));
//     //console.log('insert storage: ', this._storage);
//     this._insertCount++;
//   }
//   // this._storage.set(index, bucket [k, v]);
// };

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
  if (this.needsHalving()) { this.halve(); }
};

HashTable.prototype.needsDoubling = function() {
  return this._insertCount / this._limit > 0.75;
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

HashTable.prototype.double = function() {
  var temp = this.saveTuples();
  this._limit = this._limit * 2; 
  this._storage = LimitedArray(this._limit);
  this._insertCount = 0;
  for (var i = 0; i < this._limit; i++) {
    this._storage.set(i, []);
  }
  for (let i = 0; i < temp.length; i++) {
    this.insert(temp[i][0], temp[i][1]);
  }
};

HashTable.prototype.needsHalving = function() {
  return this._insertCount / this._limit < 0.25;
};

HashTable.prototype.halve = function() {
  var temp = this.saveTuples();
  this._limit = this._limit / 2; 
  this._storage = LimitedArray(this._limit);
  this._insertCount = 0;
  for (var i = 0; i < this._limit; i++) {
    this._storage.set(i, []);
  }
  for (let i = 0; i < temp.length; i++) {
    this.insert(temp[i][0], temp[i][1]);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


