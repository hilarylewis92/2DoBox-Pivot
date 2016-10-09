const $ = require('jquery');
require('./styles.scss');
const Todo = require('./Todo.js');

//the "God object"
function PageManager () {
  this.storage = this.getLocalStorage() || [];
  this.tasksOnPage = [];
}

//page load functions
PageManager.prototype.renderLocalStorageToPage = function  () {
  this.showTenTodos();
};

PageManager.prototype.showTenTodos = function () {
  let that = this;
  let tenTodos = this.getTenTodos();
  this.putTenTodosOnPage(tenTodos, that);
};

PageManager.prototype.getTenTodos = function () {
  return this.storage.slice(0, 10);
};

PageManager.prototype.putTenTodosOnPage = function (tenTodos, that) {
  tenTodos.forEach(function(todo){
    if (todo.completed === false){
      that.appendTodo(todo);
      that.tasksOnPage.push(todo);
    } //frontier
    let totalTasks = that.tasksOnPage.length;
    that.showHowManyTasksAreOnPage(totalTasks);
    // $(".todo-count-output").text("There are " + that.tasksOnPage.length + " tasks on the page.");
  });
}; //end of putTenTodosOnPage

PageManager.prototype.showHowManyTasksAreOnPage = function (totalTasks) {
  $(".todo-count-output").text("There are " + totalTasks + " tasks on the page.");
};

PageManager.prototype.getLocalStorage = function () {
  return JSON.parse(localStorage.getItem('list'));
};

PageManager.prototype.appendTodo = function (todo) {
  return $('.todo-list').prepend(`
    <li class="todo ${todo.completed}" id= ${todo.id}>
      <div class='first-line'>
        <h2 contenteditable class="title edit-title edit-content search">${todo.title}</h2>
        <button type="button" class="delete-btn" aria-label=“delete-btn”/></button>
      </div>
      <span contenteditable class="task edit-task edit-content search">${todo.task}</span>
      <div class='third-line'>
        <button type="button" class="up-btn" aria-label=“up-btn”/></button>
        <button type="button" class="down-btn" aria-label=“down-btn”/></button>
        <span class="importance-rating">Importance: <span class="importance">${todo.importance}</span></span>
        <input type="button" name="name" class="completed-btn" value="completed task" aria-label=“completed-btn-btn”>
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

PageManager.prototype.removeTodo = function (id) {
  this.storage = this.storage.filter(function(todo) {
    return todo.id != id;
  });
};

PageManager.prototype.changeToCompleted = function (foundTodo) {
  foundTodo.completed = true;
  localStorage.setItem('list', JSON.stringify(this.storage));
};

PageManager.prototype.editTitle = function (id, newTitle) {
  todo = this.findTodoById(id);
  todo.title = newTitle;
  localStorage.setItem('list', JSON.stringify(this.storage));
}; //end of editTitle

PageManager.prototype.editTask = function (id, newTask) {
  todo = this.findTodoById(id);
  todo.task = newTask;
  localStorage.setItem('list', JSON.stringify(this.storage));
}; //end of editTitle

PageManager.prototype.upvote = function  (foundTodo) {

  if (foundTodo.importance === "None") {
      foundTodo.importance = "Low";
    }
    else if (foundTodo.importance === "Low") {
      foundTodo.importance = "Normal";
    }
    else if (foundTodo.importance === "Normal") {
      foundTodo.importance = "High";
    }
    else if (foundTodo.importance === "High") {
      foundTodo.importance = "Critical";
    }

    this.storeItemsAfterVoting();
}; //end of upvote

PageManager.prototype.downvote = function (foundTodo) {

  if (foundTodo.importance === "Critical") {
    foundTodo.importance = "High";
  }
  else if (foundTodo.importance === "High") {
    foundTodo.importance = "Normal";
  }
  else if (foundTodo.importance === "Normal") {
    foundTodo.importance = "Low";
  }
  else if (foundTodo.importance === "Low") {
    foundTodo.importance = "None";
  }

  this.storeItemsAfterVoting();
}; //end of downvote

PageManager.prototype.storeItemsAfterVoting = function () {
  localStorage.setItem('list', JSON.stringify(this.storage));
  $(".todo-list").text("");
  this.renderLocalStorageToPage();
}

PageManager.prototype.searchForTitle = function (searchedForItem) {
  $("h2:contains('" + searchedForItem + "')").closest(".todo").show();
  $("h2:not(:contains('" + searchedForItem + "'))").closest(".todo").hide();
};

PageManager.prototype.searchForTask = function (searchedForItem) {
  $("span:contains('" + searchedForItem + "')").closest(".todo").show();
};

PageManager.prototype.formatCompletedTasks = function () {
  $(".true").each(function () {
    $(this).addClass("completed");
  });
};

PageManager.prototype.formatSingleTaskAsCompleted = function (that) {
  that.parent().parent().addClass("completed");
};

PageManager.prototype.filterByImportance = function (importanceToFilter) {
  let that = this;
  this.storage.forEach(function (todo) {
    if (todo.importance === importanceToFilter) {
      that.appendTodo(todo);
    }
    that.formatCompletedTasks();
  }); //end of forEach
}; //end of filterByImportance

PageManager.prototype.appendAllTodosToPage = function  () {
  let that = this;
  this.storage.forEach(function (todo) {
    that.appendTodo(todo);
  });
};

PageManager.prototype.deleteAllTodosFromStorage = function () {
  this.storage = [];
  localStorage.setItem('list', JSON.stringify(this.storage));
};

PageManager.prototype.temporarilyRemoveFieldEditablity = function () {
  $('.edit-content').prop('contenteditable', false);
  setTimeout(function() {
    $('.edit-content').prop('contenteditable', true);
  }, 10);
};

PageManager.prototype.putTodosInLocalStorage = function () {
  localStorage.setItem('list', JSON.stringify(this.storage));
};

module.exports = PageManager;
