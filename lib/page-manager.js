const $ = require('jquery');
require('./styles.scss');
const Todo = require('./Todo.js');

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
}; //end of findCompletedTasks

PageManager.prototype.putTasksOnPage = function () {
  let $title = $('.title-input').val();
  let $task = $('.task-input').val();
  this.makeTodoList($title, $task);

}; //end of putTasksOnPage

PageManager.prototype.makeTodoList = function (title, task) {
  let that = this;
  let todo = new Todo(title, task);
  this.storage.push(todo);
  localStorage.setItem('list', JSON.stringify(that.storage));
  this.appendTodo(todo);
}; //end of makeTodoList

PageManager.prototype.clearInputFields = function () {
  $('.title-input').val("");
  $('.task-input').val("");
};

PageManager.prototype.toggleSaveButton = function  () {
  if($('.title-input').val() !== '' && $('.task-input').val() !== ''){
    $('.save-btn').attr('disabled', false);
  }else{
    $('.save-btn').attr('disabled', true);
  }
}; // end of toggleSaveButton

PageManager.prototype.countUserChars = function (whatFieldIsThis) {
  let field;
  if (whatFieldIsThis === "title-input") {
    field = $('.title-input').val();
  }
  else if (whatFieldIsThis === "task-input") {
    field = $('.task-input').val();
  }
  $(".char-count-output").text("There are " + field.length + " " + "characters in this input field. (Max allowed: 120)");

  if ($('.task-input').val().length > 120 || $('.title-input').val().length > 120){
    $('.save-btn').attr('disabled', true);
    $(".char-count-output").text("Error: cannot submit TODOs that are more than 120 characters.");
  }
}; //end of countUserChars

PageManager.prototype.findTodoById = function (id) {
  return this.storage.find(function(todo) {
    return todo.id === id;
  });

}; //end of findTodoById

PageManager.prototype.storeItemsAfterVoting = function (foundTodo, importance) {
  console.log(importance);
  localStorage.setItem('list', JSON.stringify(this.storage));
  $(".todo-list").text("");
  this.renderLocalStorageToPage();
} //storeItemsAfterVoting

module.exports = PageManager;
