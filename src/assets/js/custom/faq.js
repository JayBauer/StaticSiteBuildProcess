import $ from 'jquery'
window.$ = $

$('.question-block').on('click', (e) => {
  $(e.currentTarget).find('.question-block__answer').toggle()
})
