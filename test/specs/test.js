const assert =  require('assert');

describe('attributes on our application',function(){
  it('has input forms and I can set values in those forms', function(){
    browser.url('/');
    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    assert.equal(todoTitle.getValue(), 'buy milk');
    assert.equal(todoTask.getValue(), 'buy milk now');
  }); //end of set values tuest

  it("should be able to add ideas to the page", function () {
    browser.url('/')
    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    var allTodos = browser.getText("li");

     assert.equal(allTodos.replace(/\n/, ", ").replace(/\n/, ", "), 'buy milk, buy milk now, Importance: Normal')
  }); //end of add ideas test

  // it("should augment the importance of an idea by one when user presses upvote", function () {
  //
  //     var todo = new Todo("Buy milk", "buy milk now");
  //
  //
  //
  // }); //end of upvote test
})
