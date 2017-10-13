describe('hashTable', function() {
  var hashTable;
  var people = [['Steven', 'Tyler'], ['George', 'Harrison'], ['Mr.', 'Doob'], ['Dr.', 'Sunshine'], ['John', 'Resig'], ['Brendan', 'Eich'], ['Alan', 'Turing']];


  beforeEach(function() {
    hashTable = new HashTable();
  });

  it('should have methods named "insert", "remove", and "retrieve', function() {
    expect(hashTable.insert).to.be.a('function');
    expect(hashTable.remove).to.be.a('function');
    expect(hashTable.retrieve).to.be.a('function');
  });

  it('should store values that were inserted', function() {
    hashTable.insert('Steven', 'Seagal');
    expect(hashTable.retrieve('Steven')).to.equal('Seagal');
  });
  
  it('should have a count of 0 after inserting and removing one value', function() {
    hashTable.insert('Steven', 'Spielberg');
    hashTable.remove('Steven');
    expect(hashTable._insertCount).to.equal(0);
  });
  
  it('should have a count of 7 after inserting 7 values', function() {
    _.each(people, function(person) {
      var firstName = person[0];
      var lastName = person[1];
      hashTable.insert(firstName, lastName);
    });
    expect(hashTable._insertCount).to.equal(7);
  });

  it('should not contain values that were not inserted', function() {
    hashTable.insert('Steven', 'Spielberg');
    expect(hashTable.retrieve('Steven')).not.to.equal('Seagal');
  });

  it('should overwrite values that have the same key', function() {
    hashTable.insert('Bob', 'Loblaw');
    hashTable.insert('Bob', 'Barker');
    expect(hashTable.retrieve('Bob')).to.equal('Barker');
  });

  it('should not contain values that were removed', function() {
    hashTable.insert('Steven', 'Tyler');
    hashTable.remove('Steven');
    expect(hashTable.retrieve('Steven')).to.equal(undefined);
  });

  it('should handle hash function collisions', function() {
    var v1 = 'val1';
    var v2 = 'val2';
    var oldHashFunction = window.getIndexBelowMaxForKey;
    window.getIndexBelowMaxForKey = function() { return 0; };
    hashTable.insert(v1, v1);
    hashTable.insert(v2, v2);
    expect(hashTable.retrieve(v1)).to.equal(v1);
    expect(hashTable.retrieve(v2)).to.equal(v2);
    window.getIndexBelowMaxForKey = oldHashFunction;
  });

  // (Advanced! Remove the extra "x" when you want the following tests to run)
  
  // Doesn't work if the table correctly doubles when too full
  it ('should detect on inserting whether it\'s too full', function() {
    hashTable._insertCount = 7;
    expect(hashTable.needsDoubling()).to.be.true;
  });
  
  it ('should create a new array with all the tuples', function() {
    hashTable.insert('Joe', 'Bloggs');
    hashTable.insert('Lamar', 'Alexander');
    hashTable.insert('Liz', 'Penny');
    hashTable.insert('Joe2', 'Bloggs2');
    hashTable.insert('Joe3', 'Bloggs3');
    var temp = hashTable.saveTuples();
    //console.log(JSON.stringify(temp));    
    expect(temp).to.eql([["Joe2","Bloggs2"],
      ["Joe3","Bloggs3"],["Lamar","Alexander"],
      ["Joe","Bloggs"],["Liz","Penny"]]);
  });
  
  it ('should double in size', function() {
    hashTable.double();
    expect(hashTable._limit).to.equal(16);
  });
    
  it ('should double in size when needed', function() {
    console.log('Starting double in size test');
    _.each(people, function(person) {
      var firstName = person[0];
      var lastName = person[1];
      hashTable.insert(firstName, lastName);
      //console.log('Spec: insertCount is: ', hashTable._insertCount);
      //console.log('Spec: needsDoubling? ', hashTable.needsDoubling());
      //JSON.stringify(hashTable._storage));

      expect(hashTable.retrieve(firstName)).to.equal(lastName);
    });
    expect(hashTable._limit).to.equal(16);
  });

  it ('should halve in size when needed', function() {
    console.log('Double test over');
    _.each(people, function(person) {
      var firstName = person[0];
      var lastName = person[1];
      hashTable.insert(firstName, lastName);
      expect(hashTable.retrieve(firstName)).to.equal(lastName);
    });
    expect(hashTable._limit).to.equal(16);
    hashTable.remove('George');
    hashTable.remove('Dr.');
    hashTable.remove('Steven');
    hashTable.remove('John');
    hashTable.remove('Mr.');
    expect(hashTable._limit).to.equal(8);
  });
});
