var Stack = function() {
  this.count = 0;  
};

Stack.prototype.size = function() {
  return this.count;
};
Stack.prototype.push = function(value) {
  this[this.count] = value;
  this.count++;
};
Stack.prototype.pop = function() {
  if (this.count > 0) {
    this.count--;
    return this[this.count];
  }
};
