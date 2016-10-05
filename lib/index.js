const $ = require('jquery');
require('./styles.scss');

let storage = getLocalStorage() || [];

renderLocalStorageToPage();

function renderLocalStorageToPage() {
  storage.forEach(function(todo) {
    appendTodo(todo);
  });
}

function appendTodo(todo) {
  return $('.todo-list').prepend(`
    <li class="todo" id= ${todo.id}>
    <div class='first-line'>
    <h2 contenteditable class="title edit-title edit-content search">${todo.title}</h2>
    <button type="button" class="delete-btn"/></button>
    </div>
    <span contenteditable class="task edit-task edit-content search">${todo.task}</span>
    <div class='third-line'>
    <button type="button" class="up-btn"/></button>
    <button type="button" class="down-btn"/></button>
    <span class="importance-rating">Importance: <span class="importance">${todo.importance}</span></span>
    </div>
    </li>
    `);
  }

$('.save-btn').on('click', function() {
  putTasksOnPage();
  clearInputFields();
});

$(".title-input, .task-input").on("keyup", function (key) {
  if (key.which === 13) {
    putTasksOnPage();
    clearInputFields();
  }
});

function putTasksOnPage () {
  let $title = $('.title-input').val();
  let $task = $('.task-input').val();
  makeTodoList($title, $task);
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('list'));
}

function clearInputFields () {
  $('.title-input').val("");
  $('.task-input').val("");
}

function Todo(title, task){
  this.title = title;
  this.task = task;
  this.id = Date.now();
  this.importance = 'Normal';
  this.completed = 'false'; //HL: to use later when we do our complete functionality
}

function makeTodoList(title, task) {
  let todo = new Todo(title, task);
  storage.push(todo);
  localStorage.setItem('list', JSON.stringify(storage));
  appendTodo(todo);
}

$('.todo-list').on('click', '.up-btn, .down-btn, .delete-btn', function() {
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
    removeTodo(id);
  }

}); //end of upvote downvote click function

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

function removeTodo(id) { //HL: we can probably combine this with the long delete function at the end of the page
    storage = storage.filter(function(todo) {
      return todo.id != id;
  });
}

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

//end of current frontier

$('.todo-list').keypress(function(event) {
  if (event.which === 13) {
    $('.edit-content').prop('contenteditable', false);
    setTimeout(function() {
      $('.edit-content').prop('contenteditable', true);
    }, 10);
  }
});

$('.search-input').on('keyup', function(event) {
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

$('.todo-list').on('click', '.delete-btn', function() {
  let id = $(this).parent().parent().attr('id');
  $(this).parent().parent().remove();
  removeTodo(id);
  localStorage.setItem('list', JSON.stringify(storage));
});
