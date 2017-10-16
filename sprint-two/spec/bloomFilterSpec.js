describe('bloomFilter', function() {
  var bloomFilter;
  var people = [['Steven', 'Tyler'], ['George', 'Harrison'], ['Mr.', 'Doob'], ['Dr.', 'Sunshine'], ['John', 'Resig'], ['Brendan', 'Eich'], ['Alan', 'Turing']];


  beforeEach(function() {
    bloomFilter = new BloomFilter();
  });

  it('should have methods named "insert", and "query', function() {
    expect(bloomFilter.insert).to.be.a('function');
    expect(bloomFilter.query).to.be.a('function');
  });
  
  it('should tell that it (definitely) doesn\'t contains an unadded value', function() {
    expect(bloomFilter.query('hello')).to.be.false;
  });
  
  it('should tell that it (probably) contains a previously added value', function() {
    bloomFilter.insert('hello');
    expect(bloomFilter.query('hello')).to.be.true;
  });
  
  
  it('should get tested', function() {
    // storage for results
    var nums = [];
    var posNums = [];
    for (var i = 0; i < 5; i++) {
      var idx = Math.floor(Math.random * 8).toString();
      bloomFilter.insert(idx.toString());
      nums.push(idx);
      if (bloomFilter.query(idx)) {
        posNums.push(idx);
      }
    }
    console.log(JSON.stringify(nums));
    console.log(JSON.stringify(posNums));
    expect(nums.length).to.equal(5);
  });

  
  
  

  xit('should store values that were inserted', function() {
    bloomFilter.insert('Steven', 'Seagal');
    expect(bloomFilter.retrieve('Steven')).to.equal('Seagal');
  });
  
  xit('should have a count of 0 after inserting and removing one value', function() {
    bloomFilter.insert('Steven', 'Spielberg');
    bloomFilter.remove('Steven');
    expect(bloomFilter._insertCount).to.equal(0);
  });
  
  xit('should have a count of 7 after inserting 7 values', function() {
    _.each(people, function(person) {
      var firstName = person[0];
      var lastName = person[1];
      bloomFilter.insert(firstName, lastName);
    });
    expect(bloomFilter._insertCount).to.equal(7);
  });

  xit('should not contain values that were not inserted', function() {
    bloomFilter.insert('Steven', 'Spielberg');
    expect(bloomFilter.retrieve('Steven')).not.to.equal('Seagal');
  });

  xit('should handle hash function collisions', function() {
    var v1 = 'val1';
    var v2 = 'val2';
    var oldHashFunction = window.getIndexBelowMaxForKey;
    window.getIndexBelowMaxForKey = function() { return 0; };
    bloomFilter.insert(v1, v1);
    bloomFilter.insert(v2, v2);
    expect(bloomFilter.retrieve(v1)).to.equal(v1);
    expect(bloomFilter.retrieve(v2)).to.equal(v2);
    window.getIndexBelowMaxForKey = oldHashFunction;
  });

  // (Advanced! Remove the extra "x" when you want the following tests to run)
  
  xit ('should create a new array with all the tuples', function() {
    bloomFilter.insert('Joe', 'Bloggs');
    bloomFilter.insert('Lamar', 'Alexander');
    bloomFilter.insert('Liz', 'Penny');
    bloomFilter.insert('Joe2', 'Bloggs2');
    bloomFilter.insert('Joe3', 'Bloggs3'); // *** don't insert too many!!!
    var temp = bloomFilter.saveTuples();
    expect(temp).to.eql([["Joe2","Bloggs2"],
      ["Joe3","Bloggs3"],["Lamar","Alexander"],
      ["Joe","Bloggs"],["Liz","Penny"]]);
  });
  
    
  xit ('should double in size when needed', function() {
    _.each(people, function(person) {
      var firstName = person[0];
      var lastName = person[1];
      bloomFilter.insert(firstName, lastName);
      expect(bloomFilter.retrieve(firstName)).to.equal(lastName);
    });
    expect(bloomFilter._limit).to.equal(16);
  });

  xit ('should halve in size when needed', function() {
    _.each(people, function(person) {
      var firstName = person[0];
      var lastName = person[1];
      bloomFilter.insert(firstName, lastName);
      expect(bloomFilter.retrieve(firstName)).to.equal(lastName);
    });
    expect(bloomFilter._limit).to.equal(16);
    bloomFilter.remove('George');
    bloomFilter.remove('Dr.');
    bloomFilter.remove('Steven');
    bloomFilter.remove('John');
    bloomFilter.remove('Mr.');
    expect(bloomFilter._limit).to.equal(8);
  });
});
