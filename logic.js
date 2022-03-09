$(document).ready(function() {

    // Call function on page load
    getQuoteData(); /* user story 6 and 7 (required) */

    // Call function on button click
    $('#new-quote').on('click', getQuoteData); /* user story 8 and 9 (required) */

    // Quotes stored in a GitHub gist as JSON
    // AJAX call to GET quotes
    function getQuoteData() {
        
        $.ajax({
            url: 'https://gist.githubusercontent.com/naraitai/3ee3966435562f6571752441a32bd040/raw/7814d85d5955b0584693d2ea5d577085df2a3a6c/quotes.json',
            
            // function to run on success
            success: function(gist) {
                let quotes = JSON.parse(gist);
                
                // get category text
                let category = $('.selected')[0];
                if (category) {
                    category = category.innerHTML.toLowerCase();
                }
                
                // check if category selected
                if (category != undefined) {
                    quotes = quotes.quotes.filter(x => x.category == category);
                } else {
                    quotes = quotes.quotes;
                }

                // pass array of quotes and get random quote
                getRandomQuote(quotes);
            }
        });
    }

    function getRandomQuote(quotes) {
        // get random integer
        let min = 0;
        let max = quotes.length;
        let randInt = Math.floor(Math.random() * (max - min + 1)) + min;
        
        // get random quote using random integer
        let randQuote = quotes[randInt];

        // pass quote on
        populateRandomQuote(randQuote);
        
    }

    function populateRandomQuote(quote) {
        // get quote text and author
        let text = quote.quote;
        let author = quote.author;

        // add quote text and author to page.
        $('#text').text(text);
        $('#author').text(author); 

        /* user story 10 (required) */
        // generate twitter href with random quote information
        $('#tweet-quote').attr('href', 
        'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + text + '"' + author)
        );
    }
});

// Copy quote text and author to clipboard
function copyText() {
    let content = $('#text').text() + ' ' + $('#author').text();
    navigator.clipboard.writeText(content);
}

// listen for click on category and add selected class
let categories = $('.category');

for (let i = 0; i < categories.length; i++) {
    let category = $(categories[i]);

    $(category).on('click', function() {
        // allow user to unselect category
        let reclick = $(category).hasClass('selected');

        // check if category previously selected and remove
        let current = $('.selected') //document.getElementsByClassName('selected');
        if (current.length != 0) {
            $(current[0]).removeClass('selected');
        } 
        
        // only add class if not second click
        if (!reclick) {
            $(category).addClass('selected');
        }
    });
}

// enable boostrap tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

// remove tooltip once user moves off button
$('#copy').mouseleave(function(){
    $('#copy').tooltip('hide');
});