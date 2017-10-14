var DoublyLinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToHead = function(value) {
    var node = Node(value);
    if (this.head !== null) {
      this.head.previous = node;
      node.next = this.head;
      this.head = node;
    }
    if (this.head === null) {
      this.head = node;
    }
  };

  list.addToTail = function(value) {
    var node = Node(value);
    if (this.tail !== null) {
      this.tail.next = node;
      node.previous = this.tail;
    }
    this.tail = node;
    if (this.head === null) {
      this.head = node;
    }
  };

  list.removeHead = function() {
    if (this.head) {
      var oldHead = list.head;
      list.head = list.head.next;
      return oldHead.value;
    } else {
      return null;
    }
  };

  list.removeTail = function() {
    if (this.tail) {
      this.tail.previous.next = null;
      var oldTail = this.tail;
      this.tail = this.tail.previous;
      return oldTail;
    } else {
      return null;
    }
  };

  list.contains = function(target) {    
    var searchList = function(node) {
      if (node.value === target) {
        return true;
      }
      if (node.next === null) {
        return false;
      }
      return searchList(node.next);
    };
    return searchList(list.head);
  };
  
  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
