// var $title = $('.title-input').val();
// var $body = $('.body-input').val();
var $save = $('.save-btn');
var counter = 0


$save.on('click', function() {
  makeIdeaList();
  clearField($('.title-input'));
  clearField($('.body-input'));
  downClick()
  qualityCounter()
});

function downClick(counter) {
$('.down-btn').on('click', function() {
qualityCounter(counter)
counter = (counter --);
console.log(counter)
})
}

function qualityCounter() {
  if (counter === 0) {
    return $('.quality').html("quality:swill");
  };
  if (counter ===1) {
    return $('.quality').html("quality:plausible");
  };
  if (counter ===2) {
    return $('.quality').html("quality:genius");
  }
}

function makeIdeaList() {
  return $('.idea-list').append(`
      <li class="idea" id= ${Date.now()}>
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
