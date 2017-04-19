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

$('#show-one').on('click', function(){
  let phraseId = Math.floor(Math.random() * 9);
  $.ajax({
    method: 'GET',
    url: `http://localhost:1337/phrases/${phraseId}`
  })
  .done(function(phrase){
    renderPhrases([phrase]);
  })
})

$('#submit-phrase').on('click', function() {
  let phrase = {
    korean: $('#korean-phrase').val(),
    english: $('#english-phrase').val()
  }

  $.ajax({
    method: 'POST',
    url: 'http://localhost:1337/phrases',
    data: JSON.stringify(phrase),
    contentType: 'application/json'
  })
  .done(function(){
    console.log(`${phrase.korean} has been added to the list!`);
    $('#korean-phrase').val('');
    $('#english-phrase').val('');
  })

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
