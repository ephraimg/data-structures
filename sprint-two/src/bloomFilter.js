var BloomFilter = function() {
  this._limit = 18;
  this._storage = LimitedArray(this._limit);
  for (let i = 0; i < this._limit; i++) {
    this._storage.set(i, 0);
  }
};

BloomFilter.prototype.insert = function(str) {
  var javaIdx = getIndexBelowMaxForKey(str, this._limit);
  var DJB2Idx = getDJB2Index(str, this._limit);
  var SDBMIdx = getSDBMIndex(str, this._limit);
  //console.log('javaIdx : ', javaIdx, 'DJB2Idx :', DJB2Idx, 'SDBMIdx : ', SDBMIdx);
  this._storage.set(javaIdx, 1);
  this._storage.set(DJB2Idx, 1);
  this._storage.set(SDBMIdx, 1);
};


BloomFilter.prototype.query = function(str) {
  var javaIdx = getIndexBelowMaxForKey(str, this._limit);
  var DJB2Idx = getDJB2Index(str, this._limit);
  var SDBMIdx = getSDBMIndex(str, this._limit);
  var javaBit = this._storage.get(javaIdx);
  var DJB2Bit = this._storage.get(DJB2Idx);
  var SDBMBit = this._storage.get(SDBMIdx);
  return javaBit === 1 ? 
    DJB2Bit === 1 ? 
      SDBMBit === 1 ? 
        true 
        : false 
      : false 
    : false;
};