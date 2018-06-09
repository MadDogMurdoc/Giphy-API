$(document).ready(function () {
    var games = ["Fallout", "Super Mario", "Runescape", "Tekken", "Starcraft", "Sonic", "Street Fighter"];

    function displaygameShow() {

        var game = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            $("#gameview").empty();

            var results = response.data;

            console.log(response);

            for (var i = 0; i < results.length; i++) {

                var gameDiv = $("<div>");

                gameDiv.addClass("gamepictures");

                var rating = results[i].rating;
                var p = $("<h2>").text("Rating: " + rating);

                var gameImage = $("<img>");
                gameImage.attr("src", results[i].images.fixed_height_still.url);
                gameImage.attr("data-still", results[i].images.fixed_height_still.url);
                gameImage.attr("data-animate", results[i].images.fixed_height.url);
                gameImage.attr("data-state", "still");
                gameImage.addClass('gameImage');

                gameDiv.prepend(p);

                gameDiv.prepend(gameImage);
                $("#gameview").prepend(gameDiv);
            }

            $(".gameImage").on("click", function () {
                var state = $(this).attr("data-state");
                console.log(state);

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }

    function renderButtons() {

        $("#addButton").empty();

        for (var i = 0; i < games.length; i++) {

            var gameAdd = $("<button>");

            gameAdd.addClass("game");

            gameAdd.attr("data-name", games[i]);

            gameAdd.text(games[i]);

            $("#addButton").append(gameAdd);
        }
    }

    $("#add-game").on("click", function (event) {
        event.preventDefault();

        var game = $("#game-input").val().trim();

        games.push(game);

        renderButtons();
    });

    $(document).on("click", ".game", displaygameShow);

    renderButtons();
});