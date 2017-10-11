var Stack = function() {
  var stack = Object.create(stackMethods);
  stack.count = 0;
  return stack;
};

var stackMethods = {};

stackMethods.size = function() {
  return this.count;
};

stackMethods.push = function(value) {
  this[this.count] = value;
  this.count++;
};

stackMethods.pop = function() {
  if (this.count > 0) {
    this.count--;
    return this[this.count];
  }
};

