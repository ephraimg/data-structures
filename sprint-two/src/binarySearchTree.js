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

  // ATTEMPT TO REUSE DEPTHFIRSTLOG
  // var insertTree = BinarySearchTree(value);
  // this.depthFirstLog(function(val) {
  //   if (value < val && this.left === undefined && ) {
  //     this.left = insertTree;
  //   }
  //   if (value > val && this.right === undefined && ) {
  //     this.right = insertTree;
  //   }
  // }).bind(this);
  
  // if (this.needsRebalancing()) { this.rebalance(); }

};

BinarySearchTree.prototype.contains = function(value) {
  var arr = [];
  this.depthFirstLog( value => arr.push(value) );
  return arr.includes(value);
};

BinarySearchTree.prototype.getDepths = function() {
  var min;
  var max = 0;
  var count = 0;
  var side;
  var maxSide = side;
  var traverse = function(tree, count) {
    if (tree.left !== undefined) {
      if (count === 0) { side = 'left'; }
      count++;
      traverse(tree.left, count); 
      count--;
    } 
    if (tree.right !== undefined) {
      if (count === 0) { side = 'right'; }
      count++; 
      traverse(tree.right, count);
      count--;
    } 
    if (tree.left === undefined && tree.right === undefined) { 
      if (count > max) { 
        max = count;
        maxSide = side;
      }
      if (count < min || min === undefined ) { 
        min = count; 
      }
    }
  };
  traverse(this, count);
  console.log('min', min, 'max', max, 'maxSide', maxSide);
  return {'min': min, 'max': max, 'maxSide': maxSide};
};

BinarySearchTree.prototype.needsRebalancing = function() {
  var depths = this.getDepths();
  return depths.max > 2 * depths.min;
};

BinarySearchTree.prototype.rebalance = function(heavySide) {
  lightSide = heavySide === 'left' ? 'right' : 'left';
  var h = this[heavySide];
  this[heavySide] = this[heavySide][lightSide];
  // this.value = this[heavySide].value;
  h[lightSide] = this;  
};

BinarySearchTree.prototype.depthFirstLog = function(cb) {
  cb(this.value);
  if (this.left) { this.left.depthFirstLog(cb); } 
  if (this.right) { this.right.depthFirstLog(cb); }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
