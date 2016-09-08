var storage = getLocalStorage() || [];
var $save = $('.save-btn');
renderToPage();

$save.on('click', function() {
  var $title = $('.title-input').val();
  var $body = $('.body-input').val();
  makeIdeaList($title, $body);
  clearField($('.title-input'));
  clearField($('.body-input'));
  downClick();
  upClick();
  edit();
});

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('list'));
}

function downClick() {
  $('.down-btn').on('click', function() {
    var $quality = $(this).siblings().closest('.quality');
    if ($quality.text() === "quality:genius") {
      $quality.html("quality:plausible");
    }
    else if ($quality.text() === "quality:plausible") {
      idea.quality = 'Swill';
      $quality.html("quality:Swill");
    }
  });
}

function upClick() {
  $('.up-btn').on('click', function() {
    var $quality = $(this).siblings().closest('.quality');
    if ($quality.text() === "quality:swill") {
      $quality.html("quality:plausible");
    }
    else if ($quality.text() === "quality:plausible") {
      $quality.html("quality:genius");
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
  this.quality = 'Swill';
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
        <input class="delete-btn" type="image" src="./images/delete.svg"/>
        <span class="edit-title">${idea.title}</span>
        <span>${idea.body}</span>
        <input class="up-btn" type="image" src="icons/upvote.svg">
        <input class="down-btn" type="image" src="icons/downvote.svg">
        <span class="quality">quality:${idea.quality}</span>
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

$('.idea-list').on('click', '.delete-btn', function() {
  $(this).parent().remove();
  deleteIdea();
});

function deleteIdea () {
  localStorage.getItem('ideaListItem');
  JSON.parse('ideaListItem');
}
