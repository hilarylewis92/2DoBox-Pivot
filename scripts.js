var title = $('.title-input').val();
var body = $('.body-input').val();
var $save = $('.save-btn');



$save.on('click', function() {
  makeIdeaList();
  clearField($('.title-input'));
  clearField($('.body-input'));
  downClick()
  upClick()

});

function downClick() {
  $('.down-btn').on('click', function() {
    if ($('.quality').text() === "quality:genius") {
      $('.quality').html("quality:plausible")
    }
    else if ($('.quality').text() === "quality:plausible") {
      $('.quality').html("quality:swill")
    }
  })
}

function upClick() {
  $('.up-btn').on('click', function() {
    if ($('.quality').text() === "quality:swill") {
      $('.quality').html("quality:plausible")
    }
    else if ($('.quality').text() === "quality:plausible") {
      $('.quality').html("quality:genius")
    }
  })
}


var storage = []

function makeIdeaList(title, body) {
  var ideaListItem = ([Date.now(), $('.title-input').val(), $('.body-input').val()]);

  JSON.stringify(ideaListItem);

  var stringifiedList = JSON.stringify(ideaListItem);

  localStorage.setItem('list', stringifiedList);

  storage.push(ideaListItem);
  return $('.idea-list').append(`
      <li class="idea" id= ${Date.now()}>
        <input class="icon delete-icon" type="image" src="./images/delete.svg"/>
        <span>${$('.title-input').val()}</span>
        <span>${$('.body-input').val()}</span>
        <input class="up-btn" type="image" src="icons/upvote.svg">
        <input class="down-btn" type="image" src="icons/downvote.svg">
        <span class="quality">quality:swill</span>
      </li>
  `);
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

$('.idea-list').on('click', '.delete-icon', function() {
  $(this).parent().remove();
  deleteIdea();
});

function deleteIdea () {
  localStorage.getItem('ideaListItem');
  JSON.parse('ideaListItem');
}
