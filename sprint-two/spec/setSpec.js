describe('set', function() {
  var set;

  beforeEach(function() {
    set = Set();
  });

  it('should have methods named "add", "contains", and "remove"', function() {
    expect(set.add).to.be.a('function');
    expect(set.contains).to.be.a('function');
    expect(set.remove).to.be.a('function');
  });

  it('should add values to a set', function() {
    set.add('Susan Sarandon');
    set.add('Danny Glover');
    expect(set.contains('Danny Glover')).to.equal(true);
    expect(set.contains('Susan Sarandon')).to.equal(true);
  });
  
  it('should count the values added to a set', function() {
    set.add('Susan Sarandon');
    set.add('Danny Glover');
    set.add('Fred Zirdung');
    set.add('Fred Zirdung');
    set.remove('Danny Glover');
    expect(set.size()).to.equal(2);
  });

  it('should remove values from a set', function() {
    set.add('Mel Gibson');
    set.remove('Mel Gibson');
    expect(set.contains('Mel Gibson')).to.equal(false);
  });

  it('should not add an item twice', function() {
    set.add('Mel Gibson');
    expect(set.add('Mel Gibson')).to.equal(false);
    expect(set.size()).to.equal(1);    
  });
  
  it('should add two deeply equal arrays', function() {
    set.add([1, 'dog', true]);
    expect(set.add([1, 'dog', true])).to.not.equal(false);
    expect(set.size()).to.equal(2);
  });
    
  it('should be able to add functions', function() {
    var a = function(x) { return x; };
    var b = function(a, b, c) { a.push(b.concat(c)); };
    set.add(a);
    set.add(b);
    set.add(Math.max);
    expect(set.contains(a)).to.equal(true);
    expect(set.contains(b)).to.equal(true);
    expect(set.contains(Math.max)).to.equal(true);
  });
  
  it('should be able to add arrays and objects', function() {
    var a = { 'a': true, '1234': 'bob'};
    var b = [4, 7, 'hello', false];
    set.add(a);
    set.add(b);
    expect(set.contains(a)).to.equal(true);
    expect(set.contains(b)).to.equal(true);
  });
  
  

});
