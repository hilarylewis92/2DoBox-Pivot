const assert =  require('assert');
require('locus')

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
<<<<<<< HEAD
    browser.url('/')
    var todoTitle = browser.element(".title-input")
    var todoTask = browser.element(".task-input")

    todoTitle.setValue('great title')
    todoTask.setValue('great task')
=======
    browser.url('/');
    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');
>>>>>>> 66b15435b0d6686772fbe1bf27975604872840a1

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
}); //end of describe attributes on our application
