const $ = require('jquery');
require('./styles.scss');
const PageManager = require('./page-manager.js');

let pageManager = new PageManager();

function upvote (foundTodo) {
  if (foundTodo.importance === "None") {
    foundTodo.importance = "Low";
  }
  else if (foundTodo.importance === "Low") {
    foundTodo.importance = "Normal";
  }
  else if (foundTodo.importance === "Normal") {
    foundTodo.importance = "High";
  }
  else if (foundTodo.importance === "High") {
    foundTodo.importance = "Critical";
  }

  pageManager.storeItemsAfterVoting();
} //end of upvote

module.exports = {upvote: upvote};
