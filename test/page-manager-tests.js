const PageManager = require('../lib/page-manager.js');
const assert = require('chai').assert;

let pageManager = new PageManager();

describe("sanity check--Todo tests", function () {
  it("should allow these tests", function () {
    assert(true);
  });
});

describe("showTenTodos", function () {
  it("should be a function", function () {
    assert.isFunction(pageManager.showTenTodos);
  });
}); //end of showTenTodos test
