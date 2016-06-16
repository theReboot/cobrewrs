#Cobrewrs: The Coworkrs Beer Tracker

Site here: [bit.ly/coworkrsbeer](http://bit.ly/coworkrsbeer)

Cobrewrs is a simple application to keep you up to date with what's on tap at Coworkrs Gowanus. It's a static [Jekyll](https://jekyllrb.com/) site, running on [Github pages](https://pages.github.com/).

The content is pulled from two sources:

1. A **[Google Sheet](https://docs.google.com/spreadsheets/d/1kwgYEHQT0BPk_-pSerQDmLQslBwceMN93LXfFSdwQu8/edit#gid=0)** with basic infomation about Coworkrs' offerings.

2. The **[Uptappd API](http://api.untappd.com)**, which provides detailed information about each beer.

##Google Sheet
The sheet contains the info about Coworkrs' beer, and is maintained by anyone in the building—if you see something say something. The data is pulled into the webpage via [Tabletop.js](https://github.com/jsoma/tabletop).


###Columns
- **Location**: this is only shown in the sheet
- **Active**: Bianary input—1 if there is a beer, 0 if there is not a beer. This tells the webpage if this tap is working or not.
- **Name**: This column is only visible in the sheet, and is essentially a translation of the BIN.
- **BIN**: Beer Identification Number. This number is the link to Untappd's API, and the site uses it to pull the Brewery Name, Beer Name, ABV, IBU, and thumbnail image.
- **Status**: A more detailed explanation of what's happening with the beer _(e.g. Good, or almost empty)_.
- **LastUpdated**: This column should not be edited. It is automatically updated whenever a change is made to either the BIN column, or the Status column.

###Finding the Beer Identification Number (BIN)

To find the BIN, navigate to [Untappd's website](untappd.com/breweries), and use their search bar to locate the beer you're looking for.

![Untappd search](http://thereboot.github.io/ws/img/readme/search.png)

Click the beer from the search dropdown menu, to navigate to the beer's page. The BIN is located in this page's URL. It's a string of numbers _(usually 3–6 digits)_ at the end of the URL.

![Untappd beer page](http://thereboot.github.io/ws/img/readme/bin.png)

##Untappd API
Beer data is pulled from the Untapped API with the BIN. A request is made each time the page is loaded, and the info isn't stored anywhere. This isn't the smartest way of accomplishing this task, particularly because Untappd limits the number of API calls each key can make:
>All API applications are rate-limited to protect aganist abuse and keep the platform healthly. The default limit for API access is 100 calls per hour per key.

Better solutions are welcomed!

---

That's about it. Have fun!
