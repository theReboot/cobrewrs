//window.onload = function() { init() };

// global var
var requestParameters = '?client_id=7665C24D5D9B86BD78146E89DED1A50440A56D43&client_secret=C5F5D761BB5AFFBB02A05F7C23A86AAC157CECE0';
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1DhV1OK7NEY3CqJ4ePth48nW9CecNrtz4QdK4xedGtDM/pubhtml';

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

          var beerModuleContent = '<div class="beerSpecs">\
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
            <div class="status"><p>Status: <strong>' + beerStatus + '</strong></p><p class="small">Last Updated: ' + beerLastUpdated + '</p></div>'

            $( ".loadWrap" ).fadeOut( 250 );
            $(beerModuleContent).hide().appendTo("#beer" + [i]).fadeIn(250);

        });
      };
    }

    for (var i = 0; i < data.length; i++) {
      if (data[i].Active === '0') {
        // nothing on tap

        var beerStatus = data[i].Status;
        var beerLastUpdated = data[i].LastUpdated;
        var beerModuleContentEmpty = '<div class="beerSpecs">' +
          '<div class="thumb ooo"></div>\
          <h2 class="ooo">Out of Order</h2>\
          </div>\
          <div class="status"><p>Status: <strong>' + beerStatus + '</strong></p><p class="small">Last Updated: ' + beerLastUpdated + '</p>\
          </div>'

        $( ".loadWrap" ).fadeOut( 250 );
        $(beerModuleContentEmpty).hide().appendTo("#beer" + [i]).fadeIn(250);

      } else {
        setTimeout( callback(i));
      }
    }
  }());

}

// http://stackoverflow.com/questions/5004233/jquery-ajax-post-example-with-php/5004276#5004276
// Variable to hold request
var request;
var sheetScript = "https://script.google.com/macros/s/AKfycbz7-8yw-9_bf3FqjwlDO6wd80NR51WyGotYQAg6_iUE55u3ZOmw/exec";

// Bind to the submit event of our form
$("#foo").submit(function(event){

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: sheetScript,
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: " +
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

    // Prevent default posting of form
    event.preventDefault();
});

// adapted from this: http://callmenick.com/post/single-page-site-with-smooth-scrolling-highlighted-link-and-fixed-navigation

$(document).ready(function(){
  $("nav a").click(function(evn){
    evn.preventDefault();
    $('html,body').scrollTo(this.hash, this.hash);
  });

  /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and
     * manipulation, class adding and class removing, and conditional testing
     */
    var aChildren = $("nav").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("nav-active");
            } else {
                $("a[href='" + theID + "']").removeClass("nav-active");
            }
        }

        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $("nav li:last-child a").addClass("nav-active");
            }
        }
    });
});

var searchURL = 'https://api.untappd.com/v4/search/beer' + requestParameters;

$("#searchterm").keyup(function(e){
  var q = $("#searchterm").val();
  $.getJSON(searchURL,
  {
    q: q,
    limit: 5
  },
  function(data) {
    $("#results").empty();
    $("#results").append(
      "Results for <b>" + q + "</b>"
    );
    $.each(data.response.beers.items, function(i,item){
      // i think this works, but my api key has reached limit for the hour :(
      console.log(item[i].beer_name)
      $("#results").append(
        //"<div><a href='http://en.wikipedia.org/wiki/" + encodeURIComponent(item.title) + "'>" + item.title + "</a>" + item.snippet + "</div>"
        '<div>' + item[i].beer_name + '</div>'
      );
    });
  });
});
