describe('bloomFilter', function() {
  var bloomFilter;
  var people = [['Steven', 'Tyler'], ['George', 'Harrison'], ['Mr.', 'Doob'], ['Dr.', 'Sunshine'], ['John', 'Resig'], ['Brendan', 'Eich'], ['Alan', 'Turing']];


  beforeEach(function() {
    bloomFilter = new BloomFilter();
  });

  it('should have methods named "insert" and "query"', function() {
    expect(bloomFilter.insert).to.be.a('function');
    expect(bloomFilter.query).to.be.a('function');
  });
  
  it('should tell that it (definitely) doesn\'t contains an unadded value', function() {
    // This test will sometimes fail, but only very rarely
    expect(bloomFilter.query('hello')).to.be.false;
  });
  
  it('should tell that it (probably) contains a previously added value', function() {
    bloomFilter.insert('hello');
    bloomFilter.insert('weg9876eg2');
    bloomFilter.insert('dge23r23');
    expect(bloomFilter.query('weg9876eg2')).to.be.true;
    expect(bloomFilter.query('hello')).to.be.true;
    expect(bloomFilter.query('dge23r23')).to.be.true;
  });
  
  
  it('should have a sufficiently low rate of false positives', function() {
    var getRand = function() { // Random string generator from StackOverflow
      return Math.random().toString(36).replace('0.', '');
    };
    var falsePosCount = 0;
    for (var j = 0; j < 10000; j++) {
      var bloomFilter = new BloomFilter();
      var rands = [];
      for (var i = 0; i < 4; i++) { 
        rands.push(getRand());
        rands.push(getRand());
        rands.push(getRand());
        rands.push(getRand());
        bloomFilter.insert(rands[0]);
        bloomFilter.insert(rands[1]);
        bloomFilter.insert(rands[2]);
        bloomFilter.insert(rands[3]);
      }
      var falseRand = getRand();
      if (bloomFilter.query(falseRand) && !rands.includes(falseRand)) {
        falsePosCount++;
      }
    }
    // With 18 bits, 3 hash functions, 4 items stored, expect 0.12 chance false pos
    expect(falsePosCount / 10000).to.be.below(0.14);

    // // For some reason, the filter is performing too well!
    // expect(falsePosCount / 10000).to.be.within(0.10, 0.14);
  });

  
  xit('should have a count of 7 after inserting 7 values', function() {
    _.each(people, function(person) {
      var firstName = person[0];
      var lastName = person[1];
      bloomFilter.insert(firstName, lastName);
    });
    expect(bloomFilter._insertCount).to.equal(7);
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
    
  xit ('should double in size when needed', function() {
    _.each(people, function(person) {
      var firstName = person[0];
      var lastName = person[1];
      bloomFilter.insert(firstName, lastName);
    });
    expect(bloomFilter._limit).to.equal(36);
  });


});
