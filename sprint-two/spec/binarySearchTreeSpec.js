describe('binarySearchTree', function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = BinarySearchTree(5);
  });

  it('should have methods named "insert", "contains", and "depthFirstLog', function() {
    expect(binarySearchTree.insert).to.be.a('function');
    expect(binarySearchTree.contains).to.be.a('function');
    expect(binarySearchTree.depthFirstLog).to.be.a('function');
  });

  it('should insert values at the correct location in the tree', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.left.right.value).to.equal(3);
    expect(binarySearchTree.right.left.value).to.equal(6);
  });

  it('should have a working "contains" method', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.contains(7)).to.equal(true);
    expect(binarySearchTree.contains(8)).to.equal(false);
  });

  it('should execute a callback on every value in a tree using "depthFirstLog"', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([5, 2, 3, 7]);
  });
  
  it('should find minimum and maximum depths', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    binarySearchTree.insert(8);
    binarySearchTree.insert(10);
    expect(binarySearchTree.getDepths().min).to.equal(1);
    expect(binarySearchTree.getDepths().max).to.equal(3);
  });
  
  it('should be able to tell when it needs rebalancing', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    binarySearchTree.insert(8);
    binarySearchTree.insert(10);
    binarySearchTree.insert(9);
    binarySearchTree.insert(11);
    binarySearchTree.insert(14);
    binarySearchTree.insert(1);
    expect(binarySearchTree.needsRebalancing()).to.be.true;
  });
  
  it('should be able to tell when it needs rebalancing', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    binarySearchTree.insert(8);
    binarySearchTree.insert(1.1);
    binarySearchTree.insert(9);
    binarySearchTree.insert(1.3);
    binarySearchTree.insert(1.2);
    binarySearchTree.insert(1.4);
    binarySearchTree.insert(1);
    binarySearchTree.insert(1.35);
    binarySearchTree.insert(1.34);
    binarySearchTree.insert(1.33);
    expect(binarySearchTree.needsRebalancing()).to.be.true;
  });
  
  it('should be rebalance', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    binarySearchTree.insert(8);
    binarySearchTree.insert(10);
    binarySearchTree.rebalance();
    expect(binarySearchTree.value).to.equal(7);
    expect(binarySearchTree.left.value).to.equal(5);
    expect(binarySearchTree.left.left.value).to.equal(2);
    expect(binarySearchTree.left.right.value).to.equal(6);
    expect(binarySearchTree.right.value).to.equal(8);
    expect(binarySearchTree.right.right.value).to.equal(10);
  });
    
});
