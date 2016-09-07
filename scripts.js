// var $title = $('.title-input').val();
// var $body = $('.body-input').val();
var $save = $('.save-btn');

$save.on('click', function() {
  makeIdeaList();
  clearField($body, $title);
});

function makeIdeaList($title, $body) {
  return $('.idea-list').append(`
      <li class="idea">
        <span>${$('.title-input').val()}</span>
        <span>${$('.body-input').val()}</span>
      </li>
  `);
}

// $title.on('click', function() {
//   clearField($title);
// });

// $body.on('click', function() {
//   clearField($body);
// });

// function clearField(element1, element2) {
//   element1.val('');
//   element2.val('');
// }

// function addIdea() {
//
// }
