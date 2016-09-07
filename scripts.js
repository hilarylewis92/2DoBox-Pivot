var $title = $('.title-input')
var $body = $('.body-input')
var $save = $('.save-btn')

$save.on('click', function() {

  clearField($body, $title)

})

$title.on('click', function() {
  clearField($title);
})

$body.on('click', function() {
  clearField($body);
})

function clearField(element1, element2) {
  element1.val('');
  element2.val('');
}

function addIdea() {
  
}
