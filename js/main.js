$(document).ready(function() {
    $('select').on('change', function() {
        var selected = $('#sections').val();
        console.log(selected);
        var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
        url += '?' + $.param({
            'api-key': "e6f99b5e399d472fbbf80ccef5d5a29c"
        });
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(data) {
            // console.log(data);

            articaleData = data.results;
            nytItems = '';
            if (articaleData.length < 1){
              nytItems += '<p class="feedback">Sorry, nothing found! Please try again.</p>';
              return;
            } else {
              let nytData = data.results.filter(function(value){
                return value.multimedia.length;
              }).splice(0,12)
              nytItems += '<ul>';
            $.each(nytData, function(index, value){

              if (value.multimedia.length > 0) {

                articalImageUrl = value.multimedia[4].url;
                sections = value.abstract;
                articleLink = value.url;

                nytItems += '<li>';
                nytItems += '<a herf='+ articleLink + '"target="_blank">';
                nytItems += '<div class="artical" style="background-image:url('+articalImageUrl+')">';
                nytItems += '<div class="photo-meta">';
                nytItems += '<p>' + (sections || "This story has no description.") + '</p>';
                nytItems += '</div>';
                nytItems += '<div>';
                nytItems += '</a>';
                nytItems += '</li>';

              }
              nytItems += '</ul>';
              $('.articlelist').append(nytItems);

            });
            }
        })

        });

      });
