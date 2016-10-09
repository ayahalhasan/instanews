'use strict';

$(document).ready(function () {
  // Function that calls the NYT API
  var $select = $('select'); // Dropdown Select manue
  $select.on('change', function (event) {
    event.preventDefault();
    var $section = $('.stories'); // HTML element where we will insart articles
    $section.empty();
    var input = $('select option:selected').val();
    // console.log(input);

    //API variable key
    var urlForAPI = "https://api.nytimes.com/svc/topstories/v2/" + input + ".json?api-key=e6f99b5e399d472fbbf80ccef5d5a29c"; // Url for API call

    //Ajax Request
    $.ajax({
      method: 'GET',
      url: urlForAPI,
      dataType: 'json'
    }).done(function (data) {
      var nyt = data.results;
      nyt = nyt.filter(function (item) {
        return item.multimedia.length;
      });
      nyt = nyt.splice(0, 12);

      var articles = ''; // String of articles for HTML

      $.each(nyt, function (index, value) {
        var link = value.url;
        var imgUrl = value.multimedia[4].url;
        var abstract = value.abstract;
        var title = value.title;

        // ES2015, append articles
        articles += '<articale>\n                    <a class="font" href="' + link + '">\n                      <div class="inner" style="background: url(' + imgUrl + '); background-size: cover">\n                        <h3 class=\'title\'> ' + title + '</h3>\n                          <div class="meta">\n                            <p>' + abstract + '</p>\n                          </div>\n                      </div>\n                    </a>\n                   </articale>';
      });

      $section.append(articles);
    }).fail(function (err) {
      $('.stories-grid').append('<p class="no-stories">Sorry! There was a problem, please try again.</p>');
    }).always(function () {});
  });
});

//position change for header
$(function () {
  $('#sections').on('change', function (event) {
    $("header").animate({
      opacity: 0,
      width: "0"
    }, 800, "linear", function () {

      $(this).css({ 'left': '0', 'opacity': '1', 'width': '100%' });
      $(this).removeClass("head").addClass("head-selected");
    });

    $(".wrapper-logo").removeClass(".wrapper-logo").addClass("wrapper-logo-selected");

    $(".logo-img").removeClass(".logo-img").addClass("logo-img-selected");
  });
});