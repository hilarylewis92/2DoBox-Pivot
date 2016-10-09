//webpack functions
require('./styles.scss');
const $ = require('jquery');
const Todo = require('./Todo.js');
const PageManager = require('./page-manager.js');
let pageManager = new PageManager();

//object to contain all the various event listener elements
const buttons = {
  characterCountOutput: $('.char-count-output'),
  heroSection: $(".hero"),
  saveBtn: $('.save-btn'),
  removeFiltersBtn: $(".remove-filters-btn"),
  showMoreTodos: $('.show-more-todos'),
  todoListContainer: $(".todo-list")
}

//page load functions
pageManager.renderLocalStorageToPage();

//housekeeping functions
function clearOutTodosFromPage () {
  buttons.todoListContainer.text("");
}

//event listeners
buttons.saveBtn.on('click', function() {
  pageManager.putTasksOnPage();
  pageManager.clearInputFields();
});

$(".title-input, .task-input").on("keyup", function (key) {
  pageManager.toggleSaveButton();
  let keyEntered = key.which;
  let whatFieldIsThis = $(this).attr("class");
  if (keyEntered === 13) {
    pageManager.putTasksOnPage();
    pageManager.clearInputFields();
  }
  else {
    pageManager.countUserChars(whatFieldIsThis);
  }
}); //end of title input and task input

buttons.heroSection.on("blur", ".title-input, .task-input", function () {
  buttons.characterCountOutput.text("");
}) //end of hero blur function

buttons.showMoreTodos.on('click', function(){
  pageManager.addTenTodos();
})

buttons.removeFiltersBtn.on("click", function () {
    clearOutTodosFromPage();
    pageManager.storage.forEach(function (todo) {
      pageManager.appendTodo(todo);
    });
    $(".true").each(function () {
      $(this).addClass("completed");
    });
}) //end of remove filters



$(".show-completed-btn").on("click", function () {
  pageManager.findCompletedTasks();
  $(".true").each(function () {
    $(this).addClass("completed");
  });
}); // end of show-completed-btn function

$('.list').on("click", ".critical-btn, .high-btn, .normal-btn, .low-btn, .none-btn", function () {
  let whatDidIClick = $(this).attr("class");
  let importanceToFilter;
  if (whatDidIClick === "critical-btn") {
    importanceToFilter = "Critical";
  }
  else if (whatDidIClick === "high-btn") {
    importanceToFilter = "High";
  }
  else if (whatDidIClick === "normal-btn") {
    importanceToFilter = "Normal";
  }
  else if (whatDidIClick === "low-btn") {
    importanceToFilter = "Low";
  }
  else if (whatDidIClick === "none-btn") {
    importanceToFilter = "None";
  }

  $(".todo-list").text("");
  pageManager.storage.forEach(function (todo) {
   if (todo.importance === importanceToFilter) {
     pageManager.appendTodo(todo);
   }
   $(".true").each(function () {
     $(this).addClass("completed");
   });
 }); //end of forEach
}); // end of importance filter function





$(".delete-all-todos").on("click", function () {
  let warning = confirm("Are you sure you want to delete ALL of your tasks? This cannot be undone!");
  if (warning) {
    pageManager.storage = [];
    localStorage.setItem('list', JSON.stringify(pageManager.storage));
    $(".todo-list").text("");
  }
}); //end of delete-all-todos

$('.todo-list').on('click', '.up-btn, .down-btn, .delete-btn, .completed-btn', function() {
  let whatDidIClick = $(this).attr("class");
  let id = parseInt($(this).closest(".todo").attr("id"));
  let foundTodo = pageManager.findTodoById(id);

  if (whatDidIClick === "up-btn") {
    pageManager.upvote(foundTodo);
  }
  else if (whatDidIClick === "down-btn") {
    pageManager.downvote(foundTodo);
  }
  else if (whatDidIClick === "delete-btn") {
    $(this).parent().parent().remove();
    pageManager.removeTodo(id);
    localStorage.setItem('list', JSON.stringify(pageManager.storage));
  }
  else if (whatDidIClick === "completed-btn") {
    pageManager.changeToCompleted(foundTodo);
    $(this).parent().parent().addClass("completed");
  } // end of if statement
}); //end of upvote downvote click function



$('.todo-list').on('blur', '.edit-title, .edit-task', function () {
  let id = parseInt($(this).closest(".todo").attr("id"));

  if (event.target.nodeName === "H2") {
    let newTitle = $(this).text();
    pageManager.editTitle(id, newTitle);
  }
  else if (event.target.nodeName === "SPAN") {
    let newTask = $(this).text();
    pageManager.editTask(id, newTask);
  }
}); //end of edit title and task click function

$('.todo-list').keypress(function(event) {
  if (event.which === 13) {
    $('.edit-content').prop('contenteditable', false);
    setTimeout(function() {
      $('.edit-content').prop('contenteditable', true);
    }, 10);
  }
});

$('.search-input').on('keyup', function(event) { //HL: this needs to be refactored
  event.preventDefault();
  let $searchBox = $(this).val().toLowerCase();
  let todos = $('.todo-list').children();
  todos.show();
  let nonSearchTodos = todos.filter(function() {
    let allTodos = $(this).find('.search').text();
    let search = (allTodos).toLowerCase();
    return !(search.includes($searchBox));
  });
  nonSearchTodos.hide();
});
