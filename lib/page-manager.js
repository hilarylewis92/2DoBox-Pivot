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
  let that = this;
  var tenTodos = this.storage.slice(0, 10);
  tenTodos.forEach(function(todo){
    if (todo.completed === false){
      that.appendTodo(todo);
      that.tasksOnPage.push(todo);
    }
    $(".todo-count-output").text("There are " + that.tasksOnPage.length + " tasks on the page.");
  });
};

PageManager.prototype.getLocalStorage = function () {
  return JSON.parse(localStorage.getItem('list'));
};

PageManager.prototype.appendTodo = function (todo) {
  return $('.todo-list').prepend(`
    <li class="todo ${todo.completed}" id= ${todo.id}>
      <div class='first-line'>
        <h2 contenteditable class="title edit-title edit-content search">${todo.title}</h2>
        <button type="button" class="delete-btn"/></button>
      </div>
      <span contenteditable class="task edit-task edit-content search">${todo.task}</span>
      <div class='third-line'>
        <button type="button" class="up-btn"/></button>
        <button type="button" class="down-btn"/></button>
        <span class="importance-rating">Importance: <span class="importance">${todo.importance}</span></span>
        <input type="button" name="name" class="completed-btn" value="completed task">
      </div>
    </li>
    `);
}; //end of appendTodo

PageManager.prototype.addTenTodos = function  () {

  let that = this;
  let tenMoreTodos = this.storage.slice(10, this.storage.length);
  tenMoreTodos.forEach(function(todo){
    if(todo.completed === false){
      that.appendTodo(todo);
      that.tasksOnPage.push(todo);
    }
    $(".todo-count-output").text("There are " + that.tasksOnPage.length + " tasks on the page.");
  });

}; //end of addTenTodos

PageManager.prototype.findCompletedTasks = function () {
  let that = this;
  this.storage.forEach(function (todo) {
   if (todo.completed === true) {
     that.appendTodo(todo);
   }
 });
};

module.exports = PageManager;
