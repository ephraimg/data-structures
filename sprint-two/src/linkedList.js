var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var node = Node(value);
    if (this.tail !== null) {
      this.tail.next = node;
    }
    this.tail = node;
    if (this.head === null) {
      this.head = node;
    }
  };

  list.removeHead = function() {
    var oldHead = list.head;
    list.head = list.head.next;
    return oldHead.value;
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

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
