//unit tests
const assert = require('chai').assert;
const Index = require('../lib/index.js');
const PageManager = require('../lib/page-manager.js');

let pageManager = new PageManager();

describe('our test bundle', function () {
  it('should work', function () {
    assert(true);
  });
}); //end of our test bundle

describe("showTenTodos", function () {
  it("should be a function", function () {
    assert.isFunction(pageManager.showTenTodos);
  });
}); //end of showTenTodos test
