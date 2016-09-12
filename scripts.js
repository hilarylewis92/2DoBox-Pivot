var storage = getLocalStorage() || [];
renderLocalStorageToPage();


$('.save-btn').on('click', function() {
  var $title = $('.title-input').val();
  var $body = $('.body-input').val();
  makeIdeaList($title, $body);
  clearField($('.title-input'));
  clearField($('.body-input'));
});


function clearField(element) {
  if (element.val !== "") {
    element.val('');
  }
}

$('.title-input').on('click', function() {
  clearField($('.title-input'));
});

$('.body-input').on('click', function() {
  clearField($('.body-input'));
});

function renderLocalStorageToPage() {
  storage.forEach(function(idea) {
    prependIdea(idea);
  });
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('list'));
}

function Idea(title, body){
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'swill';
}

function prependIdea(idea) {
  return $('.idea-list').prepend(`
      <li class="idea" id= ${idea.id}>
        <div class='first-line'>
          <span contenteditable class="title edit-title edit-content">${idea.title}</span>
          <button type="button" class="delete-btn"/></button>
        </div>
        <span contenteditable class="body edit-body edit-content">${idea.body}</span>
        <div class='third-line'>
          <button type="button" class="up-btn"/></button>
          <button type="button" class="down-btn"/></button>
          <span>quality: <span class="quality">${idea.quality}</span></span>
        </div>
      </li>
  `);
}

function makeIdeaList(title, body) {
  var idea = new Idea(title, body);
  storage.push(idea);
  localStorage.setItem('list', JSON.stringify(storage));
  prependIdea(idea);
}

function changeQuality(id, newQuality, idea) {
  id = parseInt(id);
  var idea = this.findIdeaById(id);
  idea.quality = newQuality;
  localStorage.setItem('list', JSON.stringify(storage));
}

var upQualities = {
    'swill': 'plausible',
    'plausible': 'genius',
    'genius' : 'genius'
};

$('.idea-list').on('click', '.up-btn',  function() {
    var $quality = $(this).siblings('span').children();
    var newQuality = upQualities[$quality.text()];
    $quality.text(newQuality);
    var id = $(this).parents('.idea').attr('id');
    changeQuality(id, newQuality);
});

var downQualities = {
  'genius': 'plausible',
  'plausible': 'swill',
  'swill' : 'swill'
};

$('.idea-list').on('click', '.down-btn', function() {
    var $quality = $(this).siblings('span').children();
    var newQuality = downQualities[$quality.text()];
    $quality.text(newQuality);
    var id = $(this).parents('.idea').attr('id');
    changeQuality(id, newQuality);
});

function findIdeaById(id) {
  return this.storage.find(function(idea) {
    return idea.id === id;
  });
}

function editTitle(id, newTitle, idea) {
  id = parseInt(id);
  var idea = this.findIdeaById(id);
  idea.title = newTitle;
  localStorage.setItem('list', JSON.stringify(storage));
}

$('.idea-list').on('focusout', '.edit-title', function() {
  var id = $(this).parents('.idea').attr('id');
  var newTitle = $(this).text();
  editTitle(id, newTitle);
});

function editBody(id, newBody, idea) {
  id = parseInt(id);
  var idea = this.findIdeaById(id);
  idea.body = newBody;
  localStorage.setItem('list', JSON.stringify(storage));
}

$('.idea-list').on('focusout', '.edit-body', function() {
  var id = $(this).parents('.idea').attr('id');
  var newBody = $(this).text();
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

$('.search-input').on('click', function() {
  clearField($('.search-input'));
});


$('.search-input').on('keyup', function(event) {

  event.preventDefault();
  var $searchBox = $(this).val().toLowerCase();
  var ideas = $('.idea-list').children();
  // ideas.show()
  var hideNonSearchIdeas = ideas.filter(function() {
    var allIdeas = $('.edit-content').text();
    var searchIdeas = allIdeas.toLowerCase();
    return !(searchIdeas.includes($searchBox));
  });

  hideNonSearchIdeas.hide();
});


// $('.search-input-js').on('keyup', function(event) {
//   event.preventDefault();
//   var $searchBox = $(this).val().toLowerCase();
//   var ideas = $('.all-ideas-js').children();
//   ideas.show();
//   var hideIdeas = ideas.filter(function() {
//     var allIdeas = $(this).children('.user-search-content-js').text();
//     var search = (allIdeas).toLowerCase();
//     return !(search.includes($searchBox));
//   });
//   hideIdeas.hide();
// });

function removeIdea(id) {
    var id = parseInt(id);
    storage = storage.filter(function(idea) {
      return idea.id != id;
  });
}

$('.idea-list').on('click', '.delete-btn', function() {
  var id = $(this).parent().parent().attr('id');
  $(this).parent().parent().remove();
  removeIdea(id);
  localStorage.setItem('list', JSON.stringify(storage));
});


// function clearIdeas() {
//   $('.idea-list').remove();
// }

// function findIdeaByBody() {
//   var body = $('.search-input').val();
//   return this.storage.filter(function(idea) {
//     return idea.body === body;
//   });
// }

// $('.search-input').keypress(function(event) {
//   if (event.which === 13) {
//     var body = $('.search-input').val();
//     function findIdeaByBody(body) {
//       return this.storage.filter(function(idea) {
//         return idea.body === body;
//       });
//     }
//   }
// });

// function findIdeaByTitle(title) {
//   debugger
//   var title = $('.search-input').val();
//   return this.storage.filter(function() {
//     this.title === title;
//   });
//   // $('.idea-list').append();
// }
//
// $('.search-input').keypress(function(event) {
//   if (event.which === 13) {
//     var title = $('.search-input').val();
//     findIdeaByTitle(title);
//     clearIdeas();
//   }
// });
