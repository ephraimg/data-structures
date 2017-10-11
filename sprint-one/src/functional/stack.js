var Stack = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var count = 0;
  // Implement the methods below
  someInstance.push = function(value) {
    storage[count] = value;
    count++;
  };

  someInstance.pop = function() {
    count--;
    var popped = storage[count];
    delete storage[count];
    return popped;
  };

  someInstance.size = function() {
    if (count < 0) {
      count = 0;
    }
    return count;
  };

  return someInstance;
};
