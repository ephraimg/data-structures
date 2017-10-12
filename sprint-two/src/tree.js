var Tree = function(value) {
  var newTree = {};
  newTree.value = value;
  _.extend(newTree, treeMethods);
  newTree.children = [];
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var child = Tree(value);
  this.children.push(child);
};

treeMethods.contains = function(target) {
  var traverse = function(tree) {
    if (tree.value === target) {
      return true;
    }
    var answer = false;
    for (var c = 0; c < tree.children.length; c++) {
      if (traverse(tree.children[c])) { answer = true; }
    }
    return answer;
  };
  return traverse(this);
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
