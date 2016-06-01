window.onload = function() { init() };

// global var
var requestParameters = '?client_id=7665C24D5D9B86BD78146E89DED1A50440A56D43&client_secret=C5F5D761BB5AFFBB02A05F7C23A86AAC157CECE0';
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1kwgYEHQT0BPk_-pSerQDmLQslBwceMN93LXfFSdwQu8/pubhtml';

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } )
}

// function showInfo(data, tabletop) {
//
// console.log(data);
//
//   for (var i = 0; i < data.length; i++) {
//
//
//
//     if (data[i].Active === '0') {
//       // nothing on tap
//       $("#beer"+[i]).addClass("ooo").append('<h2>Out of order</h2>'
//       );
//     } else {
//       // function for each beer
//       var beerID = data[i].BIN;
//       var beerStatus = data[i].Status;
//       var url = 'https://api.untappd.com/v4/beer/info/' + beerID + requestParameters;
//
//       // find the appropriate div and attach status
//       $("#beer"+ [i]).append('<h2>' + beerStatus + '</h2>');
//
//       // get beer data from Untappd
//       $.getJSON(url, function(untappddata) {
//
//         var beerName = untappddata.response.beer.beer_name;
//         var beerBrewery = untappddata.response.beer.brewery.brewery_name;
//         var beerABV = untappddata.response.beer.beer_abv;
//         var beerIBU = untappddata.response.beer.beer_ibu;
//         var beerRating = untappddata.response.beer.rating_score;
//
//         console.log(i);
//
//         $("#beer" + [i]).append('<div>' +
//         '<h2>' + beerName + '</h2>' +
//         '<h4>' + beerBrewery + '</h4>' +
//         '<p>' + beerABV + '% ABV, IBU ' + beerIBU + '</p>' +
//         '<p>Rating: ' + beerRating + '</p>' +
//         '</div>'
//         );
//       });
//     } // end else
//   }
// }

function showInfo(data, tabletop) {

  console.log(data);

  (function() {
    var i,j;
    function callback(i) {
      return function() {

        var beerID = data[i].BIN;
        var beerStatus = data[i].Status;
        var url = 'https://api.untappd.com/v4/beer/info/' + beerID + requestParameters;


        $.getJSON(url, function(data) {

          var beerName = data.response.beer.beer_name;
          var beerBrewery = data.response.beer.brewery.brewery_name;
          var beerStyle = data.response.beer.beer_style;
          var beerABV = data.response.beer.beer_abv;
          var beerIBU = data.response.beer.beer_ibu;
          var beerRating = data.response.beer.rating_score;
          var beerLabel = data.response.beer.beer_label;

          $("#beer" + [i]).append('<div>' +
            '<img src="' + beerLabel + '" class="thumb" />' +
            '<h4>' + beerBrewery + '</h4>' +
            '<h2>' + beerName + '</h2>' +
            '<p><span class="status">' + beerStatus + '</span></h4>' +
            '<p><span class="beerStyle">' + beerStyle + '</span></p>' +
            '<p><span class="beerMeta">' + beerABV + '% ABV</span> | <span class="beerMeta">IBU ' + beerIBU + '</span> | <span class="beerMeta">Rating: ' + beerRating + '</span></p>' +
            '</div>'
          );
        });
      };
    }

    for (var i = 0; i < data.length; i++) {
      if (data[i].Active === '0') {
        // nothing on tap
        $("#beer"+[i]).addClass("ooo").append('<h2>Out of order</h2>'
        );
      } else {
        setTimeout( callback(i));
      }
    }
  }());
}
