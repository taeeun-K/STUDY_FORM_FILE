document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM이 준비되었습니다! (Vanilla JS)");
});

//console.log('---------------------------------------------------------')

$(document).ready(function() {
  console.log("DOM이 준비되었습니다! (jQuery)");
});

$(function() {
  console.log("DOM이 준비되었습니다! (짧은 jQuery)");
});
