var Queue = function() {
  this.max = 0;
  this.min = 0;
};

Queue.prototype.size = function () {
  return this.max - this.min;
};

Queue.prototype.enqueue = function (value) {
  this[this.max] = value;
  this.max++;
};

Queue.prototype.dequeue = function () {
  if (this.max - this.min > 0) {
    this.min++;
    return this[this.min - 1]; 
  }
};

