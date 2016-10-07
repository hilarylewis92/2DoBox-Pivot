//unit tests
const assert = require('chai').assert;
const Index = require('../lib/index.js');

let showTenTodos = Index.showTenTodos;
console.log(showTenTodos)

describe('our test bundle', function () {
  it('should work', function () {
    assert(true);
  });
});

describe("showTenTodos", function () {
  it("should be a function", function () {
    assert.isFunction(showTenTodos);
  });
}); //end of showTenTodos test
