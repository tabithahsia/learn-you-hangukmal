console.log('learn you korean client is running...');

$('#show-all').on('click', function(){
  $.ajax({
    method: 'GET',
    url: 'http://localhost:1337/phrases'
  })
  .done(function(phrases){
    renderPhrases(phrases);
  });
});

function renderPhrases(phrases) {
  $('#phrases').html('');
  phrases.forEach((phrase) => {
    renderPhrase(phrase);
  });
}

function renderPhrase(phrase) {
  var $el = $('<div class="phrase"></div>');
  $el.text(`English: ${phrase.english} || Korean: ${phrase.korean}`);
  $('#phrases').append($el);
}
