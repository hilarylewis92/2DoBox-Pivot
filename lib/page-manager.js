const $ = require('jquery');
require('./styles.scss');
const Todo = require('./Todo.js');

//the "God object"
function PageManager () {
  this.storage = this.getLocalStorage() || [];
  this.tasksOnPage = [];
}

//elements object
const buttons = {
  characterCountOutput: $(".char-count-output"),
  saveBtn: $('.save-btn'),
  taskInput: $('.task-input'),
  titleInput: $('.title-input'),
  todoCountOutput: $(".todo-count-output")
};

//page load functions
PageManager.prototype.renderLocalStorageToPage = function  () {
  this.showTenTodos();
  this.clearInputFields();
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
    }
    let totalTasks = that.tasksOnPage.length;
    that.showHowManyTasksAreOnPage(totalTasks);
  });
}; //end of putTenTodosOnPage

PageManager.prototype.showHowManyTasksAreOnPage = function (totalTasks) {
  buttons.todoCountOutput.text("There are " + totalTasks + " tasks on the page.");
};

//core functionality

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

PageManager.prototype.putTasksOnPage = function () {
  let $title = buttons.titleInput.val();
  let $task = buttons.taskInput.val();
  this.makeTodoList($title, $task);

}; //end of putTasksOnPage

PageManager.prototype.makeTodoList = function (title, task) {
  let that = this;
  this.createSingleNewTodo(title, task, that);
}; //end of makeTodoList

PageManager.prototype.createSingleNewTodo = function (title, task, that) {
  let todo = new Todo(title, task);
  that.storage.push(todo);
  localStorage.setItem('list', JSON.stringify(that.storage));
  that.appendTodo(todo);
};

PageManager.prototype.clearInputFields = function () {
  buttons.titleInput.val("");
  buttons.taskInput.val("");
};

PageManager.prototype.toggleSaveButton = function  () {
  let that = this;
  if (buttons.titleInput.val() !== '' && buttons.taskInput.val() !== ''){
    that.enableSaveButton()
  }
  else {
    that.disableSaveButton();
  }
}; // end of toggleSaveButton

PageManager.prototype.enableSaveButton = function () {
  buttons.saveBtn.attr('disabled', false);
}

PageManager.prototype.disableSaveButton = function () {
  buttons.saveBtn.attr('disabled', true);
}

PageManager.prototype.countUserChars = function (whatFieldIsThis) {
  let field;
  let that = this;
  if (whatFieldIsThis === "title-input") {
    field = buttons.titleInput.val();
  }
  else if (whatFieldIsThis === "task-input") {
    field = buttons.taskInput.val();
  }

  let len = field.length;

  if (buttons.taskInput.val().length > 120 || buttons.titleInput.val().length > 120){
    that.disableSaveButton();
    that.showCharCount();
  }
  else {
    that.showCharCount(len);
  }
}; //end of countUserChars

PageManager.prototype.showCharCount = function (len) {
  if (len) {
    buttons.characterCountOutput.text("There are " + len + " " + "characters in this input field. (Max allowed: 120)");
  } else {
    buttons.characterCountOutput.text("Either the input field is empty or you submitted more than 120 characters. Please submit fewer than 120 characters to enable saving tasks to page.");
  }
} //end of showCharCount

PageManager.prototype.searchForTitle = function (searchedForItem) {
  $("h2:contains('" + searchedForItem + "')").closest(".todo").show();
  $("h2:not(:contains('" + searchedForItem + "'))").closest(".todo").hide();
};

PageManager.prototype.searchForTask = function (searchedForItem) {
  $("span:contains('" + searchedForItem + "')").closest(".todo").show();
};

//frontier

PageManager.prototype.findCompletedTasks = function () {
  // let that = this;
  this.putCompletedTasksOnPage();
  // this.storage.forEach(function (todo) {
  //   if (todo.completed === true) {
  //     that.appendTodo(todo);
  //   }
  // });
}; //end of findCompletedTasks

PageManager.prototype.putCompletedTasksOnPage = function () {
  let that = this;
  this.storage.forEach(function (todo) {
    if (todo.completed === true) {
      that.appendTodo(todo);
    }
  });
} //end of putCompletedTasksOnPage







PageManager.prototype.getLocalStorage = function () {
  return JSON.parse(localStorage.getItem('list'));
};






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
