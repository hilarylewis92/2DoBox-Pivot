const $ = require('jquery');
require('./styles.scss');

let storage = getLocalStorage() || [];

renderLocalStorageToPage();

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

function renderLocalStorageToPage() {
  storage.forEach(function(todo) {
    appendTodo(todo);
  });
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

function appendTodo(todo) {
  return $('.todo-list').prepend(`
      <li class="todo" id= ${todo.id}>

        <div class='first-line'>
          <span contenteditable class="title edit-title edit-content search">${todo.title}</span>
          <button type="button" class="delete-btn"/></button>
        </div>
        <div class='second-line'>
          <span contenteditable class="task edit-task edit-content search">${todo.task}</span>
        </div>

        <div class='third-line'>
          <button type="button" class="up-btn"/></button>
          <button type="button" class="down-btn"/></button>
          <span class="importance-rating">Importance: <span class="importance">${todo.importance}</span></span>
          <input type="button" name="name" class="completed-btn" value="completed task">
        </div>

      </li>
  `);
}

function makeTodoList(title, task) {
  let todo = new Todo(title, task);
  storage.push(todo);
  localStorage.setItem('list', JSON.stringify(storage));
  appendTodo(todo);
}

function changeImportance(id, newImportance) { // HL: why does this take in todo as a param?
  id = parseInt(id);
  todo = findTodoById(id);
  todo.importance = newImportance;
  localStorage.setItem('list', JSON.stringify(storage));
}

function findTodoById(id) {
  return storage.find(function(todo) {
    return todo.id === id;
  });
}

function editTitle(id, newTitle) {
  id = parseInt(id);
  todo = findTodoById(id);
  todo.title = newTitle;
  localStorage.setItem('list', JSON.stringify(storage));
}

function editTask(id, newTask) {
  id = parseInt(id);
  todo = findTodoById(id);
  todo.task = newTask;
  localStorage.setItem('list', JSON.stringify(storage));
}

function removeTodo(id) {
    id = parseInt(id);
    storage = storage.filter(function(todo) {
      return todo.id != id;
  });
}

let upQualities = {
    'None': 'Low',
    'Low': 'Normal',
    'Normal' : 'High',
    'High' : 'Critical',
    'Critical' : 'Critical'
};

$('.todo-list').on('click', '.up-btn',  function() {
    let $importance = $(this).siblings('span').children();
    let newImportance = upQualities[$importance.text()];
    $importance.text(newImportance);
    let id = $(this).parents('.todo').attr('id');
    changeImportance(id, newImportance);
});

let downQualities = {
  'Critical': 'High',
  'High': 'Normal',
  'Normal' : 'Low',
  'Low' : 'None',
  'None' : 'None'
};

$('.todo-list').on('click', '.down-btn', function() {
    let $importance = $(this).siblings('span').children();
    let newImportance = downQualities[$importance.text()];
    $importance.text(newImportance);
    let id = $(this).parents('.todo').attr('id');
    changeImportance(id, newImportance);
});


$('.todo-list').on('focusout', '.edit-title', function() {
  let id = $(this).parents('.todo').attr('id');
  let newTitle = $(this).text();
  editTitle(id, newTitle);
});


$('.todo-list').on('focusout', '.edit-task', function() {
  let id = $(this).parents('.todo').attr('id');
  let newTask = $(this).text();
  editTask(id, newTask);
});

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
