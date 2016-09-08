// var $title = $('.title-input').val();
// var $body = $('.body-input').val();
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
    if ($('.quality').text(this) === "quality:genius") {
      this.html("quality:plausible")
    }
    else if ($('.quality').text(this) === "quality:plausible") {
      this.html("quality:swill")
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




function makeIdeaList(idea) {
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


// function createIdea() {
//   var ideaTitle = $('.title-input-field').val();
//   var ideaBody = $('.body-input-field').val();
//   var uniqueId = Date.now();
//   var ideaQuality = "swill";
//   var idea = { id: uniqueId, title: ideaTitle, body: ideaBody, quality: ideaQuality };
//   ideaStore.addIdea(idea);
//   render(ideaStore.getIdeas());
// }
