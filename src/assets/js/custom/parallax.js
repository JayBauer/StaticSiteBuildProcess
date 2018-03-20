import $ from 'jquery';
window.$ = $;

var body = document.body;
var e = document.documentElement;
$(window).unbind("scroll").scroll(function () {
  var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
  $('.parallax-bg').css({'backgroundPosition':'50% ' + scrollPercent + '%'});
});
