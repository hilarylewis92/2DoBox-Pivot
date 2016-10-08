const $ = require('jquery');
require('./styles.scss');

function PageManager () {
  this.storage = getLocalStorage() || [];
  this.tasksOnPage = [];
}

PageManager.prototype.renderLocalStorageToPage = function  () {
  this.showTenTodos();
};

PageManager.prototype.showTenTodos = function () {
  var tenTodos = storage.slice(0, 10);
  tenTodos.forEach(function(todo){
    if (todo.completed === false){
      appendTodo(todo);
      tasksOnPage.push(todo);
    }
    $(".todo-count-output").text("There are " + tasksOnPage.length + " tasks on the page.");
  });
};

module.exports = PageManager;
