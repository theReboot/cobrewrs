window.onload = function() { init() };

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1kwgYEHQT0BPk_-pSerQDmLQslBwceMN93LXfFSdwQu8/pubhtml';

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
  visualizeIt(data);
}

function visualizeIt(data){
  for (var i = 0; i < data.length; i++) {
    // the loop
    var LowerLevelLeft = data[i].LowerLevelLeft;
    var description = data[i].Description;

    $(".services").append('<div class="service">' +
      '<h2>' + LowerLevelLeft + '</h2>' +
      '<p>' + description + '</p>' +
      '</div>'
    );
  }
}
