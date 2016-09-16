$(document).ready(function(){
  // Function that calls the NYT API
  var $select = $('select'); // Dropdown Select manue
  $select.on('change', function(event) {
  event.preventDefault();
  var $section = $('.stories'); // HTML element where we will insart articles
  $section.empty();
  var input = $('select option:selected').val();
  // console.log(input);

  //API variable key
  var urlForAPI = "https://api.nytimes.com/svc/topstories/v2/" + input +
  ".json?api-key=e6f99b5e399d472fbbf80ccef5d5a29c"; // Url for API call

  //Ajax Request
  $.ajax({
    method: 'GET',
    url: urlForAPI,
    dataType: 'json',
  })
  .done(function(data){
    let nyt = data.results;
    nyt = nyt.filter(function(item) {
      return item.multimedia.length;
    });
    nyt = nyt.splice(0,12);

    let articles = ''; // String of articles for HTML

    $.each(nyt, (index, value) => {
      let link = value.url;
      let imgUrl = value.multimedia[4].url;
      let abstract = value.abstract;


      articles += `<article>
                    <a href="${link}">
                      <div class="inner" style="background: url(${imgUrl}); background-size: cover">
                        <p>${abstract}</p>
                      </div>
                    </a>
                   </article>`
    });

    $section.append(articles);
  })
  .always(function(){

  });


  });

});
