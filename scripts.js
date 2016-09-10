var storage = getLocalStorage() || [];
renderLocalStorageToPage();


$('.save-btn').on('click', function() {
  var $title = $('.title-input').val();
  var $body = $('.body-input').val();
  makeIdeaList($title, $body);
  clearField($('.title-input'));
  clearField($('.body-input'));
});

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('list'));
}

var downQualities = {
  'genius': 'plausible',
  'plausible': 'swill',
  'swill' : 'swill'
};

  $('.idea-list').on('click', '.down-btn', function() {

    var $quality = $(this).siblings('span').children();
    var newQuality = downQualities[$quality.text()];
    $quality.text(newQuality);
    var id = $(this).parents('.idea').attr('id')
    changeQuality(id, newQuality);
  });

  function changeQuality(id, newQuality, idea) {
    id = parseInt(id);
    var idea = this.findIdeaById(id);
    idea.quality = newQuality;
    this.makeIdeaList()
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
  });


function renderLocalStorageToPage() {
  storage.forEach(function(idea) {
    appendIdea(idea);
  });
}

function Idea(title, body){
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'swill';
}

function makeIdeaList(title, body) {
  var idea = new Idea(title, body);
  storage.push(idea);
  localStorage.setItem('list', JSON.stringify(storage));
  appendIdea(idea);
}

function appendIdea(idea) {
  return $('.idea-list').append(`
      <li class="idea" id= ${idea.id}>
        <div class='first-line'>
          <span contenteditable class="title edit-title edit-content">${idea.title}</span>
          <button type="button" class="delete-btn"/></button>
        </div>
        <span contenteditable class="body edit-body edit-content">${idea.body}</span>
        <div class='third-line'>
          <button type="button" class="up-btn"/></button>
          <button type="button" class="down-btn"/></button>
          <span>quality:<span class="quality">${idea.quality}</span></span>
        </div>
      </li>
  `);
}

function findIdeaById(id) {
  return this.storage.find(function(idea) {
    return idea.id === id;
  });
}


function editTitle(id, newTitle, idea) {
  id = parseInt(id);
  var idea = this.findIdeaById(id);
  idea.title = newTitle;
  this.makeIdeaList();
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
  this.makeIdeaList();
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


$('.title-input').on('click', function() {
  clearField($('.title-input'));
});

$('.body-input').on('click', function() {
  clearField($('.body-input'));
});

function clearField(element) {
  if (element.val !== "") {
    element.val('');
  }
}

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










//
// var $save = $('.save-btn');
// var $downVote = $('.down-btn');
// var $upVote = $('.up-btn');
// var $removeIdea = $('.delete-btn');
// var $ideaList = $('.idea-list');
// var $title = $('.title-input');
// var $body = $('.body-input');
//
// $save.on('click', function() {
//   ideaBox.add($title);
// });
//
// var ideaBox = {
//   ideas: [],
//
//   add: function () {
//     this.ideas.push(new Idea(title));
//     this.render();
//   },
//
//   remove: function (id) {
//     id = parseInt(id);
//     this.ideas = this.ideas.filter(function(r) {
//       return r.id !== id;
//     });
//     this.store();
//     this.render();
//   },
//
//   render: function () {
//     $ideaList.html('')
//       var ideas = this.ideas[i];
//       $ideaList.append(ideas.toHTML());
//       $save.on('click', function(event) {
//         event.preventDefault();
//         var title = $title.val();
//       });
//       this.store();
//   },
//
//   find: function (id) {
//     var foundIdea;
//     for (i = 0; i < this.ideas.length; i++) {
//       if (this.ideas[i].id === id) {
//         foundIdea = this.Idea[i];
//         break;
//       }
//     }
//     return foundIdea;
//   },
//
//   store: function () {
//     localStorage.setItem('ideas', JSON.stringify(this.ideas));
//   },
//
//   retrieve: function () {
//     var retrievedIdeas = JSON.parse(localStorage.getItem('ideas'));
//     if(retrieveIdeas) {
//       for (i = 0; i < retrievedIdeas.length; i++) {
//         var ideas = retrievedIdeas[i];
//         ideas.push(newIdea(ideas.title, ideas.body, ideas.id, ideas.quality));
//       }
//     }
//     this.ideas = ideas;
//     this.render();
//   }
// };
//
//
// function Idea(title, body, id, quality){
//   this.title = title;
//   this.body = body;
//   this.id = id || Date.now();
//   this.quality = quality || 'swill';
// }
//
// Idea.prototype.upVote = function () {
//   this.quality = this.quality ++;
//   this.store();
// };
//
// Idea.prototype.downVote = function () {
//   this.quality = this.quality --;
//   this.store();
// };
//
// Idea.prototype.toHTML = function() {
//   return $('$ideaList').append(`
//       <li class="idea" id= ${ideas.id}>
//         <div class='first-line'>
//           <span class="title edit-title">${ideas.title}</span>
//           <input class="delete-btn" type="image" src="./images/delete.svg"/>
//         </div>
//         <span class="body edit-body">${ideas.body}</span>
//         <div class='third-line'>
//           <input class="up-btn" type="image" src="icons/upvote.svg">
//           <input class="down-btn" type="image" src="icons/downvote.svg">
//           <span class="quality">quality:${ideas.quality}</span>
//         </div>
//       </li>
//   `);
// };
//
// $ideaList.on('click', '$removeIdea', function() {
//   var id = $(this).parents('.idea').attr('id');
//   ideaBox.remove(id);
// });
