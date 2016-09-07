// var $title = $('.title-input').val();
// var $body = $('.body-input').val();
var $save = $('.save-btn');

$save.on('click', function() {
  makeIdeaList();
  JSON
  clearField($('.title-input'), $('.body-input'));
});

function makeIdeaList() {
  return $('.idea-list').append(`
      <li class="idea" id=${Date.now()}>
        <span>${$('.title-input').val()}</span>
        <span>${$('.body-input').val()}</span>
        <span>quality: </span>
      </li>
  `);
}

// function JSON

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
