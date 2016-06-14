window.onload = function() { init() };

// global var
var requestParameters = '?client_id=7665C24D5D9B86BD78146E89DED1A50440A56D43&client_secret=C5F5D761BB5AFFBB02A05F7C23A86AAC157CECE0';
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1kwgYEHQT0BPk_-pSerQDmLQslBwceMN93LXfFSdwQu8/pubhtml';

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {

  console.log(data);

  (function() {
    var i,j;
    function callback(i) {
      return function() {

        var beerID = data[i].BIN;
        var beerStatus = data[i].Status;
        var beerLastUpdated = data[i].LastUpdated;
        var url = 'https://api.untappd.com/v4/beer/info/' + beerID + requestParameters;

        $.getJSON(url, function(data) {

          var beerName = data.response.beer.beer_name;
          var beerBrewery = data.response.beer.brewery.brewery_name;
          var beerABV = data.response.beer.beer_abv;
          var beerIBU = data.response.beer.beer_ibu;
          var beerRating = data.response.beer.rating_score;
          var beerRatingPercent = (beerRating/5)*100;
          beerRating = beerRating.toFixed(2);
          var beerLabel = data.response.beer.beer_label;

          $("#beer" + [i]).append('<div class="beerSpecs">\
            <img src="' + beerLabel + '" class="thumb" />' +
            '<h4>' + beerBrewery + '</h4>' +
            '<h2>' + beerName + '</h2>' +
            '<div class="grid">\
            <div class="col-1-4 beerMeta">\
            <p class="label">ABV</p><p>' + beerABV + '%</p>\
            </div>\
            <div class="col-1-4 beerMeta">\
            <p class="label">IBU</p><p>' + beerIBU + '</p>\
            </div>\
            <div class="col-1-2 beerMeta">\
            <p class="label">Rating:</p>\
            <div class="star-rating">\
              <div class="star-rating-top" style="width:' + beerRatingPercent + '%"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>\
              <div class="star-rating-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>\
            </div>\
            <p class="small">' + beerRating + '/5.00</p>\
            </div>\
            </div>\
            </div>\
            <div class="status"><p>Status: ' + beerStatus + '</p><p class="small">Last Updated: ' + beerLastUpdated + '</p></div>'
          );
        });
      };
    }

    for (var i = 0; i < data.length; i++) {
      if (data[i].Active === '0') {
        // nothing on tap
        $("#beer" + [i]).append('<div class="beerSpecs">' +
          '<div class="thumb ooo"></div>' +
          '<h2>Out of Order</h2>' +
          //'<p><span class="beerMeta">' + beerABV + '% ABV</span> | <span class="beerMeta">IBU ' + beerIBU + '</span> | <span class="beerMeta">Rating: ' + beerRating + '/5.00</span></p>' +
          '</div>' +
          '<div class="status"><p>Status: out of order</p></div>'
        );
      } else {
        setTimeout( callback(i));
      }
    }
  }());
}
