const $ = require('jquery');
require('./styles.scss');

let storage = getLocalStorage() || [];

let tasksOnPage = [];

$(".todo-count-output").css("color", "white"); //HL: we should probably convert this to CSS; I just wanted to avoid cross-contaminating the CSS file

renderLocalStorageToPage();

function showTenTodos(){
  var tenTodos = storage.slice(0, 10);
  tenTodos.forEach(function(todo){
    if (todo.completed === false){
      appendTodo(todo);
      tasksOnPage.push(todo);
    }
    $(".todo-count-output").text("There are " + tasksOnPage.length + " tasks on the page.");
  })
}

function renderLocalStorageToPage() {
  showTenTodos();
} // end of renderLocalStorageToPage

$('.show-more-todos').on('click', function(){
  addTenTodos();
})

function addTenTodos(){
  var tenMoreTodos = storage.slice(10, storage.length);
  tenMoreTodos.forEach(function(todo){
    if(todo.completed === false){
      appendTodo(todo);
      tasksOnPage.push(todo);
    }
    $(".todo-count-output").text("There are " + tasksOnPage.length + " tasks on the page.");
  });
}

$(".show-completed-btn").on("click", function () {
  findCompletedTasks();
  $(".true").each(function () {
    $(this).addClass("completed");
  });
}); // end of show-completed-btn function

function findCompletedTasks () {
   storage.forEach(function (todo) {
    if (todo.completed === true) {
      appendTodo(todo);
      // console.log(this);
    }
  });
} // end of findCompletedTasks


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
  storage.forEach(function (todo) {
   if (todo.importance === importanceToFilter) {
     appendTodo(todo);
   }
   $(".true").each(function () {
     $(this).addClass("completed");
   });
 }); //end of forEach
}); // end of importance filter function

function appendTodo(todo) {
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
  }

$('.save-btn').on('click', function() {
  putTasksOnPage();
  clearInputFields();
});

function toggleSaveButton(){
  if($('.title-input').val() !== '' && $('.task-input').val() !== ''){
    $('.save-btn').attr('disabled', false);
  }else{
    $('.save-btn').attr('disabled', true);
  }
}

$(".title-input, .task-input").on("keyup", function (key) {
  toggleSaveButton();
  let keyEntered = key.which;
  let whatFieldIsThis = $(this).attr("class");
  if (keyEntered === 13) {
    putTasksOnPage();
    clearInputFields();
  }
  else {
    countUserChars(whatFieldIsThis);
  }
});

function countUserChars (whatFieldIsThis) {
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
}

function putTasksOnPage () {
  let $title = $('.title-input').val();
  let $task = $('.task-input').val();
  makeTodoList($title, $task);
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('list'));
}

$(".delete-all-todos").on("click", function () {
  let warning = confirm("Are you sure you want to delete ALL of your tasks? This cannot be undone!");
  if (warning) {
    storage = [];
    localStorage.setItem('list', JSON.stringify(storage));
    $(".todo-list").text("");
  }
});

function clearInputFields () {
  $('.title-input').val("");
  $('.task-input').val("");
}

function Todo(title, task){
  this.title = title;
  this.task = task;
  this.id = Date.now();
  this.importance = 'Normal';
  this.completed = false;
}

function makeTodoList(title, task) {
  let todo = new Todo(title, task);
  storage.push(todo);
  localStorage.setItem('list', JSON.stringify(storage));
  appendTodo(todo);
}

$('.todo-list').on('click', '.up-btn, .down-btn, .delete-btn, .completed-btn', function() {
  let whatDidIClick = $(this).attr("class");
  let id = parseInt($(this).closest(".todo").attr("id"));
  let foundTodo = findTodoById(id);

  if (whatDidIClick === "up-btn") {
    upvote(foundTodo);
  }
  else if (whatDidIClick === "down-btn") {
    downvote(foundTodo);
  }
  else if (whatDidIClick === "delete-btn") {
    $(this).parent().parent().remove();
    removeTodo(id);
    localStorage.setItem('list', JSON.stringify(storage));
  }
  else if (whatDidIClick === "completed-btn") {
    changeToCompleted(foundTodo);
    $(this).parent().parent().addClass("completed");
  } // end of if statement
}); //end of upvote downvote click function

function changeToCompleted(foundTodo){
  foundTodo.completed = true;
  localStorage.setItem('list', JSON.stringify(storage));
}

function upvote (foundTodo) {
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

  storeItemsAfterVoting();
} //end of upvote

function downvote (foundTodo) {
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

  storeItemsAfterVoting();
} //end of downvote

function storeItemsAfterVoting () {
  localStorage.setItem('list', JSON.stringify(storage));
  $(".todo-list").text("");
  renderLocalStorageToPage();
}

function findTodoById(id) {
  return storage.find(function(todo) {
    return todo.id === id;
  });
}

function removeTodo(id) {
  storage = storage.filter(function(todo) {
    return todo.id != id;
  });
}

$(".hero").on("blur", ".title-input, .task-input", function () {
  $('.char-count-output').text("");
}) //end of hero blur function


$('.todo-list').on('blur', '.edit-title, .edit-task', function () {
  let id = parseInt($(this).closest(".todo").attr("id"));

  if (event.target.nodeName === "H2") {
    let newTitle = $(this).text();
    editTitle(id, newTitle);
  }
  else if (event.target.nodeName === "SPAN") {
    let newTask = $(this).text();
    editTask(id, newTask);
  }
}); //end of edit title and task click function

function editTitle(id, newTitle) {
  todo = findTodoById(id);
  todo.title = newTitle;
  localStorage.setItem('list', JSON.stringify(storage));
}

function editTask(id, newTask) {
  todo = findTodoById(id);
  todo.task = newTask;
  localStorage.setItem('list', JSON.stringify(storage));
}

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

module.exports = {
  showTenTodos: showTenTodos
}
