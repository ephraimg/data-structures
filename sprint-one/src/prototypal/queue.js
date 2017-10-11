var Queue = function() {
  var queue = Object.create(queueMethods);
  queue.max = 0;
  queue.min = 0;
  return queue;
};

var queueMethods = {};
queueMethods.size = function() {
  return this.max - this.min;
};
queueMethods.enqueue = function(value) {
  this[this.max] = value;
  this.max++;
};
queueMethods.dequeue = function() {
  if (this.max - this.min > 0) {
    this.min++;
    return this[this.min - 1];
  }
};
