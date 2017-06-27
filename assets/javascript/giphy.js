
// Pokemon Array
var pokemon = ["Pikachu","Squirtle","Bulbasaur","Charmander"];

function displayGif() {
    var pokemon = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + pokemon + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Ajax call
    $.ajax({ url: queryUrl, method: "GET"}).done(function(response) {
        // Empty's div holding previous Gifs
        $('.gifGoesHere').empty();

        for (let i = 0; i < response.data.length; i++) {
            // Variables to add HTML elements and standardize images generated by buttons
            var gifDiv     = $('<div class="gifDiv">');
            var rating     = response.data[i].rating;
            var ratingDiv  = $('<p>').html("Rating: " + rating);
            var animated   = response.data[i].images.fixed_height.url;
            var still      = response.data[i].images.fixed_height_still.url;
            var gifImg     = $('<img class="gImage">');
            
            // Defaulting gifs to still
            gifImg.attr('src', still);
            gifImg.attr('data-still', still);
            gifImg.attr('data-animate', animated);
            gifImg.attr('data-state', 'still')
            
            // Securing ratings appear after their respective gifs
            gifDiv.append(ratingDiv);
            gifDiv.prepend(gifImg);
            $('.gifGoesHere').prepend(gifDiv);
        }
    });
};

// Onclick function to animate/pause gifs
$('.gifGoesHere').on("click", ".gImage", function() {

    var state = $(this).attr('data-state');
    // If state = still, on click will animate the gif
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');}
    // Otherwise, if state != still, gif will pause on click   
    else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

// New buttons function
function renderButtons() {
  $(".buttons-original").empty();
  // Verifying buttons
  for (let i = 0; i < pokemon.length; i++) {
    let addButton = $('<button class="button">');
    addButton.addClass("pokemon");
    addButton.attr("data-name", pokemon[i]);
    addButton.html(pokemon[i]);

    // Appends new buttons to the end of the list of existing buttons
    $(".buttons-original").append(addButton);
  }
};

// New button created when field has a value entered
$(".add-gif").on("click", function(event){
    event.preventDefault();
    var gifs = $(".gif-name").val().trim();
    pokemon.push(gifs);
    renderButtons();
});

// Calls the buttons to be created in the class 'pokemon'
$(document).on("click", ".pokemon", displayGif);
renderButtons();