var Stack = function() {
  var stack = {};
  stack.count = 0;
  _.extend(stack, stackMethods);
  return stack;
};

var stackMethods = {};
stackMethods.pop = function() {
  if (this.count > 0) {
    this.count--;
    return this[this.count];
  }
  
};
stackMethods.push = function(value) {
  this[this.count] = value;
  this.count++;
};
stackMethods.size = function() {
  return this.count;
};


