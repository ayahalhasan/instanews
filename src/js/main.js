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
      let title = value.title;

// ES2015, append articles
      articles += `<articale>
                    <a class="font" href="${link}">
                      <div class="inner" style="background: url(${imgUrl}); background-size: cover">
                        <h3 class='title'> ${title}</h3>
                          <div class="meta">
                            <p>${abstract}</p>
                          </div>
                      </div>
                    </a>
                   </articale>`
    });

    $section.append(articles);
  })
  .fail(function(err) {
		  $('.stories-grid').append('<p class="no-stories">Sorry! There was a problem, please try again.</p>');
		})
    .always(function(){

    });
  });

});

//position change for header
$(function(){
	$('#sections').on('change', function(event) {
		$("header").animate({
    		opacity: 0,
    		width: "0",
    	},800, "linear", function() {

  			$(this).css({'left':'0','opacity':'1','width':'100%'});
  			$( this ).removeClass( "head" ).addClass( "head-selected");
		})

		$( ".wrapper-logo" ).removeClass( ".wrapper-logo" ).addClass( "wrapper-logo-selected" );

		$( ".logo-img" ).removeClass( ".logo-img" ).addClass( "logo-img-selected" );

	});
});
