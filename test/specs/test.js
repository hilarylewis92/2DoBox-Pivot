const assert =  require('assert');
// require('locus')

describe('attributes on our application',function(){
  it('has input forms and I can set values in those forms', function(){
    browser.url('/');
    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    assert.equal(todoTitle.getValue(), 'buy milk');
    assert.equal(todoTask.getValue(), 'buy milk now');
  }); //end of set values test

  it("should be able to add ideas to the page", function () {
    browser.url('/');
    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    var allTodos = browser.getText("li");

     assert.equal(allTodos.replace(/\n/, ", ").replace(/\n/, ", "), 'buy milk, buy milk now, Importance: Normal')
  }); //end of add ideas test

  it("should augment the importance of an idea by one when user presses upvote", function () {
    browser.url('/');

    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    browser.click(".up-btn");

    var importance = browser.getText('.importance-rating')
    assert.equal(importance[0], 'Importance: High')
  }); //end of upvote test

  it("should decrease the importance of an idea by one when user presses downvote", function () {
    browser.url('/');

    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    browser.click(".down-btn");

    var importance = browser.getText('.importance-rating')
    assert.equal(importance[0], 'Importance: Low')
  }); //end of downvote test

  it("should remove an item when remove button is clicked", function () {
    browser.url('/');

    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");
    var itemLengths = browser.getText("li").length
    assert.equal(browser.getText("li").length, itemLengths);

    browser.click(".delete-btn");
    assert.equal(browser.getText("li").length, itemLengths-1);
  }); //end of remove test

  it("should return searched item when user types into search box", function () {
    browser.url('/');

    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");
    browser.keys("dogs");

    assert.strictEqual("dogs", "cats");

    //user types "ilk" into search field

    //title and body in the first item on page must only contain "ilk" (nothing else)


  }); //end of search test

}); //end of describe attributes on our application
