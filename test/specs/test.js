const assert =  require('assert');

describe('attributes on our application',function(){
  it('has input forms and I can set values in those forms', function(){
    browser.url('/')
    var todoTitle = browser.element(".title-input")
    var todoTask = browser.element(".task-input")

    todoTitle.setValue('great title')
    todoTask.setValue('great task')

    assert.equal(todoTitle.getValue(), 'great title')
    assert.equal(todoTask.getValue(), 'great task')
  })

  it("should be able to add ideas to the page", function () {
    browser.url('/')
    var todoTitle = browser.element(".title-input")
    var todoTask = browser.element(".task-input")

    todoTitle.setValue('great title')
    todoTask.setValue('great task')

    browser.click(".save-btn");

    var allTodos = browser.getText("li");

     assert.equal(allTodos.replace(/\n/, ", ").replace(/\n/, ", "), 'great title, great task, Importance: Normal')
  });
})
