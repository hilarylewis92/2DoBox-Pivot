var storage = getLocalStorage() || [];
renderToPage();
downClick();
upClick();

$('.save-btn').on('click', function() {
  var $title = $('.title-input').val();
  var $body = $('.body-input').val();
  makeIdeaList($title, $body);
  clearField($('.title-input'));
  clearField($('.body-input'));

  edit();
});

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('list'));
}

function downClick() {
  $('.down-btn').on('click', function() {
    var $quality = $(this).siblings().filter('.quality');
    if ($quality.text() === "quality:plausible") {
      // return idea.quality = 'Swill';
      return $quality.html("quality:swill");
    }
    if ($quality.text() === "quality:genius") {
      return $quality.html("quality:plausible");
    }
  });
  }

function upClick() {
  $('.up-btn').on('click', function() {

    var $quality = $(this).siblings().filter('.quality');
    if ($quality.text() === "quality:plausible") {
      return $quality.html("quality:genius");
    }
    if ($quality.text() === "quality:swill") {
      return $quality.html("quality:plausible");
    }
  });
}

function renderToPage() {
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
          <span class="title edit-title">${idea.title}</span>
          <input class="delete-btn" type="image" src="./images/delete.svg"/>
        </div>
        <span class="body edit-body">${idea.body}</span>
        <div class='third-line'>
          <input class="up-btn" type="image" src="icons/upvote.svg">
          <input class="down-btn" type="image" src="icons/downvote.svg">
          <span class="quality">quality:${idea.quality}</span>
        </div>
      </li>
  `);
}

function edit() {
  $('.edit-title').on('click', function() {
    var $fill = $(this);
    $(this).html($('<input type=text/>').val( $fill.text() ));
  });
}

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

$('.delete-btn').on('click', function() {
  $(this).parent().parent().remove();
});

// $('.delete-btn').on('click', function() {
//   var id = $(this).data('idea');
//   $(this).remove();
//   localStorage.clear();
//
// });
//
// function deleteIdea () {
//   storage.pull(idea);
//   localStorage.getItem('list', JSON.parse(storage));
//
  // JSON.parse('ideaListItem');

  // var idea = new Idea(title, body);
  // storage.push(idea);
  // localStorage.setItem('list', JSON.stringify(storage));
  // appendIdea(idea);
// }
