$(document).ready(function() {
    $('#sections').on('change', function() {
      event.preventDefault();

        selection = $('#sections').val();
        nytimesUrl = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";

        //API Variable key
        var url = nytimesUrl;
        url += '?' + $.param({
            'api-key': "e6f99b5e399d472fbbf80ccef5d5a29c"
        });

        //
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(data) {
            // console.log(result);

            articaleData = data.result;
            nytItems = '';
            if (articaleData.length < 1){
              nytItems += '<p class="feedback">Sorry, nothing found! Please try again.</p>';
              return;
            } else {
              let nytData = data.result.filter(function(value){
                return value.multimedia.length;
              }).splice(0,12)
            nytItems += '<ul>';
            $.each(nytData, function(index, value){

              if (value. multimedia.lenght > 0) {
                articalImageUrl = value.multimedia[4].url;
                articalCaption = value.abstract;
                articleLink = value.url;

                nytItems += '<li>';
                nytItems +=  '<a herf='+ articaleLink'>';
                nytItems +=     '<div class="artical" style="background-image:url('+articaleImageUrl+')">';
                nytItems += '<div class="photo-meta">';
                nytItems += '<p>' + (articaleCaption || "This story has no description.") + '</p>';
                nytItems += '</div>';
                nytItems += '<div>';
                nytItems += '</a>';
                nytItems += '</li>'
              }
            });
            }
            nytItems +=
            nytItems += '</ul>';
            $articalelist.append(nytItems);
        })
        //.fail(function(err) {
          //  throw err;
        });

    });
});
