var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var max = 0;
  var min = 0;

  // Implement the methods below

  someInstance.enqueue = function(value) {
    storage[max] = value;
    max++;
  };

  someInstance.dequeue = function() {
    if ((max - min) > 0) {
      min++;
      return storage[min - 1];
    }
    
  };

  someInstance.size = function() {
    return max - min;
  };

  return someInstance;
};
