// Client ID: 7665C24D5D9B86BD78146E89DED1A50440A56D43
// Client Secret: C5F5D761BB5AFFBB02A05F7C23A86AAC157CECE0

// global var
var requestParameters = '?client_id=7665C24D5D9B86BD78146E89DED1A50440A56D43&client_secret=C5F5D761BB5AFFBB02A05F7C23A86AAC157CECE0';

// function for each beer
var beerID;
var url = 'https://api.untappd.com/v4/beer/info/' + beerID + requestParameters;

// $.getJSON(url, function(data) {
//
//   var beerName = data.response.beer.beer_name;
//   var beerBrewery = data.response.beer.brewery.brewery_name;
//   var beerABV = data.response.beer.beer_abv;
//   var beerIBU = data.response.beer.beer_ibu;
//   var beerRating = data.response.beer.rating_score;
//
//   // console.log(data);
//
// });
