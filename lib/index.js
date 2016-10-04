const $ = require('jquery');

let storage = getLocalStorage() || [];

renderLocalStorageToPage();

$('.save-btn').on('click', function() {
  putTasksOnPage();
  clearInputFields();
  // clearField($('.title-input'));
  // clearField($('.task-input'));
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

// $('.title-input').on('click', function() {
//   clearField($('.title-input'));
// });
//
// $('.task-input').on('click', function() {
//   clearField($('.task-input'));
// });

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

// function clearField(element) {
//   if (element.val !== "") {
//     element.val('');
//   }
// }

function Todo(title, task){
  this.title = title;
  this.task = task;
  this.id = Date.now();
  this.quality = 'Normal';
  this.completed = 'false'; //HL: to use late when we do our complete functionality
}

function appendTodo(todo) {
  return $('.todo-list').prepend(`
      <li class="todo" id= ${todo.id}>
        <div class='first-line'>
          <span contenteditable class="title edit-title edit-content search">${todo.title}</span>
          <button type="button" class="delete-btn"/></button>
        </div>
        <span contenteditable class="task edit-task edit-content search">${todo.task}</span>
        <div class='third-line'>
          <button type="button" class="up-btn"/></button>
          <button type="button" class="down-btn"/></button>
          <span>quality: <span class="quality">${todo.quality}</span></span>
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

function changeQuality(id, newQuality, todo) { // HL: why does this take in todo as a param?
  id = parseInt(id);
  todo = findTodoById(id);
  todo.quality = newQuality;
  localStorage.setItem('list', JSON.stringify(storage));
}

function findTodoById(id) {
  return storage.find(function(todo) {
    return todo.id === id;
  });
}

function editTitle(id, newTitle, todo) {
  id = parseInt(id);
  todo = findTodoById(id);
  todo.title = newTitle;
  localStorage.setItem('list', JSON.stringify(storage));
}

function editTask(id, newTask, todo) {
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
    let $quality = $(this).siblings('span').children();
    let newQuality = upQualities[$quality.text()];
    $quality.text(newQuality);
    let id = $(this).parents('.todo').attr('id');
    changeQuality(id, newQuality);
});

let downQualities = {
  'Critical': 'High',
  'High': 'Normal',
  'Normal' : 'Low',
  'Low' : 'None',
  'None' : 'None'
};

$('.todo-list').on('click', '.down-btn', function() {
    let $quality = $(this).siblings('span').children();
    let newQuality = downQualities[$quality.text()];
    $quality.text(newQuality);
    let id = $(this).parents('.todo').attr('id');
    changeQuality(id, newQuality);
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

// $('.search-input').on('click', function() {
//   clearField($('.search-input'));
// });


$('.todo-list').on('click', '.delete-btn', function() {
  let id = $(this).parent().parent().attr('id');
  $(this).parent().parent().remove();
  removeTodo(id);
  localStorage.setItem('list', JSON.stringify(storage));
});
