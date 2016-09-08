var title = $('.title-input').val();
var body = $('.body-input').val();
var $save = $('.save-btn');

$save.on('click', function() {
  makeIdeaList();
  clearField($('.title-input'), $('.body-input'));
});

var storage = [];

function makeIdeaList(title, body) {
  var ideaListItem = ([Date.now(), $('.title-input').val(), $('.body-input').val()]);

  JSON.stringify(ideaListItem);

  var stringifiedList = JSON.stringify(ideaListItem);

  localStorage.setItem('list', stringifiedList);

  storage.push(ideaListItem);

  return $('.idea-list').append(`
      <li class="idea" id=${Date.now()}>
        <span class="title">${$('.title-input').val()}</span>
        <img class="icon delete-icon" src="./images/delete.svg" alt="delete" /><br>
        <span>${$('.body-input').val()}</span><br>
        <img class="icon upvote-icon" src="./images/upvote.svg">
        <img class="icon downvote-icon" src="./images/downvote.svg">
        <span>quality: </span>
      </li>
  `);
}

$('.title-input').on('click', function() {
  clearField($('.title-input'));
});

$('.body-input').on('click', function() {
  clearField($('.body-input'));
});

function clearField(element1, element2) {
  element1.val('');
  element2.val('');
}

$('.idea-list').on('click', '.delete-icon', function() {
  $(this).parent().remove();
  deleteIdea();
});

function deleteIdea () {
  localStorage.getItem('ideaListItem');
  JSON.parse('ideaListItem');
}
