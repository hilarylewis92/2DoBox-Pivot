// var $title = $('.title-input').val();
// var $body = $('.body-input').val();
var $save = $('.save-btn');

$save.on('click', function() {
  makeIdeaList();
  clearField($('.title-input'), $('.body-input'));
});

function makeIdeaList() {
  return $('.idea-list').append(`
      <li class="idea">
        <span>${$('.title-input').val()}</span>
        <span>${$('.body-input').val()}</span>
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

function 
