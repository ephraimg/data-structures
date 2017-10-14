describe('tree', function() {
  var tree;

  beforeEach(function() {
    tree = Tree();
  });

  it('should have methods named "addChild" and "contains", and a property named "value" and a method named "traverse"', function() {
    expect(tree.addChild).to.be.a('function');
    expect(tree.contains).to.be.a('function');
    expect(tree.hasOwnProperty('value')).to.equal(true);
    expect(tree.traverse).to.be.a('function');
  });

  it('should add children to the tree', function() {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

  it('should detach a child from its parent', function() {
    tree.addChild(5);
    tree.addChild(2);
    tree.addChild(1);
    tree.addChild(4);
    tree.children[2].addChild(3);
    tree.children[2].addChild(8);
    expect(tree.children[2].children.length).to.equal(2);
    tree.children[2].children[0].removeFromParent();
    expect(tree.children[2].children.length).to.equal(1);    
  });

  it('should return true for a value that the tree contains', function() {
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
  });

  it('should return false for a value that was not added', function() {
    tree.addChild(5);
    expect(tree.contains(6)).to.equal(false);
  });

  it('should be able to add children to a tree\'s child', function() {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it('should correctly detect nested children', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.contains(7)).to.equal(true);
    expect(tree.contains(8)).to.equal(true);
  });
  
  it ('should traverse the tree and call the callback on every node', function() {
    tree.addChild(5);
    tree.addChild(3);
    tree.addChild(2);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    tree.children[2].addChild(8);
    tree.children[2].addChild(8);
    tree.children[0].addChild(11);
    var array = [];
    tree.traverse(function (node) {
      array.push(node.value);
    });
    expect(array.slice(1)).to.eql([5, 7, 11, 3, 8, 2, 8, 8]);
  });

});
