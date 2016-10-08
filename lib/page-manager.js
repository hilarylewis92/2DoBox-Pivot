const $ = require('jquery');
require('./styles.scss');

function PageManager () {
  this.storage = this.getLocalStorage() || [];
  this.tasksOnPage = [];
}

PageManager.prototype.renderLocalStorageToPage = function  () {
  this.showTenTodos();
};

PageManager.prototype.showTenTodos = function () {
  var tenTodos = this.storage.slice(0, 10);
  tenTodos.forEach(function(todo){
    if (todo.completed === false){
      this.appendTodo(todo);
      tasksOnPage.push(todo);
    }
    $(".todo-count-output").text("There are " + tasksOnPage.length + " tasks on the page.");
  });
};

PageManager.prototype.getLocalStorage = function () {
  return JSON.parse(localStorage.getItem('list'));
};



module.exports = PageManager;
