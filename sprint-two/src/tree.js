var Tree = function(value) {
  var newTree = {};
  newTree.value = value;
  _.extend(newTree, treeMethods);
  newTree.children = [];
  newTree.parent = null;
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var child = Tree(value);
  child.parent = this;
  this.children.push(child);
};

treeMethods.removeFromParent = function() {
  var idx = this.parent.children.indexOf(this);
  this.parent.children.splice(idx, 1);
  // if (this.children.length > 0) {
  //   this.children.forEach(function(tree) {
  //     tree.parent = this.parent;
  //     this.parent.children.push(tree);
  //   }, this);
  // }
  /* :top: this is actually not supposed to happen, but Alan 
  told me to finish it
  */ 
  this.parent = null;
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

treeMethods.traverse = function(cb) {
  cb(this);
  if (this.children.length !== 0) {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].traverse(cb);
    }
  }
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
