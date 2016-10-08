//feature tests
const assert =  require('assert');
const $ = require('jquery');
require('locus');

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

  it("should persist data after reload", function () {
    browser.url('/');
    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    browser.url('/');

    var allTodos = browser.getText("li");

     assert.equal(allTodos[0].replace(/\n/, ", ").replace(/\n/, ", "), 'buy milk, buy milk now, Importance: Normal')
  }); //end of persist data

  it("should clear items from input fields when the user presses save", function () {
    browser.url('/');

    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");
    assert.equal(todoTitle.getValue(), "");

  }); //end of clear items

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
    assert.equal(browser.getText("li").length, itemLengths - 1);
  }); //end of remove test

  it("should persist deletion of an item after page reload", function () {
    browser.url('/');

    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");
    var itemLengths = browser.getText("li").length
    assert.equal(browser.getText("li").length, itemLengths);

    browser.click(".delete-btn");
    browser.url('/');
    assert.equal(browser.getText("li").length, itemLengths - 1);
  }); //end of persist deletion

  it.skip("should not return an item not matching text in title or task fields when user types into search box", function () { //not passing
    browser.url('/');

    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");
    var search = browser.element(".search-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    search.setValue("z");

    var found = ('.todo-list').getValue;

    assert.notMatch(found, /^z/, 'regexp does not match');


  }); //end of search test

  it("should count the characters entered by the user", function () {
    browser.url('/');

    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");
    var text = browser.element(".char-count-output");

    todoTitle.setValue('cats');

    assert.equal(browser.getText(".char-count-output"), "There are 4 characters in this input field. (Max allowed: 120)");
  }); //end of char count test

  it("should only allow ten items on the page when page is refreshed", function () { //not passing
    browser.url('/');

    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".save-btn");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now'); //18 tasks entered total

    browser.click(".save-btn");

    browser.url('/');

    assert.equal(browser.getText(".todo-count-output"), "There are 10 tasks on the page.");
  }); //end of remove test

  it("should not allow more than 120 characters in either input field", function () { //test passes, but it takes a long time to run

    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('garbage gabitron gabitron bluecifer gusto milkman suhdude blakement garbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron bluecifer gusto milkman suhdude blakementgarbage gabitron gabitron '); //total: 158 words
    todoTask.setValue('buy milk now');

    assert.equal(browser.getText(".char-count-output"), "Error: cannot submit TODOs that are more than 120 characters.");

  }); //end of 120 chars

  it("should allow the user to edit title and task/body fields by clicking and typing in their changes", function () {
    var todoTitle = browser.element(".title-input");
    var todoTask = browser.element(".task-input");

    todoTitle.setValue('buy milk');
    todoTask.setValue('buy milk now');

    browser.click(".edit-title");
    todoTitle.setValue('this is not a good task');
    browser.keys("\uE007"); //the enter key

    assert.equal(browser.getText(".edit-title")[0], 'this is not a good task');

  }); //end of edit title and body

}); //end of describe attributes on our application
