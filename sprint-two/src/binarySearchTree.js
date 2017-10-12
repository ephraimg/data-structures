var BinarySearchTree = function(value) {
  var bst = Object.create(BinarySearchTree.prototype);
  bst.value = value;
  bst.left;
  bst.right;
  return bst;
};

BinarySearchTree.prototype.insert = function(value) {  
  var traverse = function(tree) {
    if (value < tree.value) {
      if (tree.left === undefined) {
        tree.left = BinarySearchTree(value);
      } else {
        traverse(tree.left);
      }
    }
    if (value > tree.value) {
      if (tree.right === undefined) {
        tree.right = BinarySearchTree(value);
      } else {
        traverse(tree.right);
      }
    }
  }; 
  traverse(this);  
};

BinarySearchTree.prototype.contains = function(value) {
  var arr = [];
  this.depthFirstLog(function(value) {
    arr.push(value);
  });
  return arr.includes(value);
};

BinarySearchTree.prototype.depthFirstLog = function(cb) {
  cb(this.value);
  if (this.left) {
    this.left.depthFirstLog(cb);
  } 
  if (this.right) {
    this.right.depthFirstLog(cb);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
