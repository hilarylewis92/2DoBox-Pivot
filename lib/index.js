const $ = require('jquery');

let storage = getLocalStorage() || [];

renderLocalStorageToPage();

$('.save-btn').on('click', function() {
  putTasksOnPage();
  clearInputFields();
  // clearField($('.title-input'));
  // clearField($('.body-input'));
});

function putTasksOnPage () {
  let $title = $('.title-input').val();
  let $body = $('.body-input').val();
  makeIdeaList($title, $body);
}

// $('.title-input').on('click', function() {
//   clearField($('.title-input'));
// });
//
// $('.body-input').on('click', function() {
//   clearField($('.body-input'));
// });

function renderLocalStorageToPage() {
  storage.forEach(function(idea) {
    appendIdea(idea);
  });
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('list'));
}

function clearInputFields () {
  $('.title-input').val("");
  $('.body-input').val("");
}

// function clearField(element) {
//   if (element.val !== "") {
//     element.val('');
//   }
// }

function Idea(title, body){
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'Normal';
}

function appendIdea(idea) {
  return $('.idea-list').prepend(`
      <li class="idea" id= ${idea.id}>
        <div class='first-line'>
          <span contenteditable class="title edit-title edit-content search">${idea.title}</span>
          <button type="button" class="delete-btn"/></button>
        </div>
        <span contenteditable class="body edit-body edit-content search">${idea.body}</span>
        <div class='third-line'>
          <button type="button" class="up-btn"/></button>
          <button type="button" class="down-btn"/></button>
          <span>quality: <span class="quality">${idea.quality}</span></span>
        </div>
      </li>
  `);
}

function makeIdeaList(title, body) {
  let idea = new Idea(title, body);
  storage.push(idea);
  localStorage.setItem('list', JSON.stringify(storage));
  appendIdea(idea);
}

function changeQuality(id, newQuality, idea) { // HL: why does this take in idea as a param?
  id = parseInt(id);
  idea = findIdeaById(id);
  idea.quality = newQuality;
  localStorage.setItem('list', JSON.stringify(storage));
}

function findIdeaById(id) {
  return storage.find(function(idea) {
    return idea.id === id;
  });
}

function editTitle(id, newTitle, idea) {
  id = parseInt(id);
  idea = findIdeaById(id);
  idea.title = newTitle;
  localStorage.setItem('list', JSON.stringify(storage));
}

function editBody(id, newBody, idea) {
  id = parseInt(id);
  idea = findIdeaById(id);
  idea.body = newBody;
  localStorage.setItem('list', JSON.stringify(storage));
}

function removeIdea(id) {
    id = parseInt(id);
    storage = storage.filter(function(idea) {
      return idea.id != id;
  });
}

let upQualities = {
    'None': 'Low',
    'Low': 'Normal',
    'Normal' : 'High',
    'High' : 'Critical'
};

$('.idea-list').on('click', '.up-btn',  function() {
    let $quality = $(this).siblings('span').children();
    let newQuality = upQualities[$quality.text()];
    $quality.text(newQuality);
    let id = $(this).parents('.idea').attr('id');
    changeQuality(id, newQuality);
});

let downQualities = {
  'Critical': 'High',
  'High': 'Normal',
  'Normal' : 'Low',
  'Low' : 'None'
};

$('.idea-list').on('click', '.down-btn', function() {
    let $quality = $(this).siblings('span').children();
    let newQuality = downQualities[$quality.text()];
    $quality.text(newQuality);
    let id = $(this).parents('.idea').attr('id');
    changeQuality(id, newQuality);
});


$('.idea-list').on('focusout', '.edit-title', function() {
  let id = $(this).parents('.idea').attr('id');
  let newTitle = $(this).text();
  editTitle(id, newTitle);
});


$('.idea-list').on('focusout', '.edit-body', function() {
  let id = $(this).parents('.idea').attr('id');
  let newBody = $(this).text();
  editBody(id, newBody);
});

$('.idea-list').keypress(function(event) {
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
  let ideas = $('.idea-list').children();
  ideas.show();
  let nonSearchIdeas = ideas.filter(function() {
    let allIdeas = $(this).find('.search').text();
    let search = (allIdeas).toLowerCase();
    return !(search.includes($searchBox));
  });
  nonSearchIdeas.hide();
});

$('.search-input').on('click', function() {
  clearField($('.search-input'));
});


$('.idea-list').on('click', '.delete-btn', function() {
  let id = $(this).parent().parent().attr('id');
  $(this).parent().parent().remove();
  removeIdea(id);
  localStorage.setItem('list', JSON.stringify(storage));
});
