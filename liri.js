//required packages
require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require('axios');
var moment = require('moment');

var fs = require('fs');

//user input vars
var command = process.argv[2];
var inputVal = process.argv[3];



switch (command) {
    case "concert-this":
        concertThis(inputVal);
        break;
    case "spotify-this-song":
        spotifySong(inputVal);
        break;
    case "movie-this":
        movieThis(inputVal);
        break;
    case "do-what-it-says":
        doWhatItSays(inputVal);
        break;
    default:
        console.log("Wrong command! Try one of these: node liri.js concert-this  node liri.js spotify-this   node liri.js  movie-this  node liri.js do-what-it-says")
        break;
};


function concertThis(inputVal) {

    var url = "https://rest.bandsintown.com/artists/" + inputVal + "/events?app_id=codingbootcamp";


    axios.get(url).then(function (response) {
            console.log(inputVal);
            for (var i = 0; i < response.data.length; i++) {
                console.log("Name of the venue: " + response.data[i].venue.name);
                console.log("Located in " + response.data[i].venue.city + " " + response.data[i].venue.country);
                var date = moment(response.data[i].datetime).format("MM/DD/YYYY HH:mm:ss");
                console.log("Date of concert: " + date + "\n");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}


function spotifySong(inputVal) {
    if (inputVal == "") {
        inputVal = "Ace of Base";
    }

    spotify.search({
            type: 'track',
            query: inputVal
        })
        .then(function () {
            for (var i = 0; i < 5; i++) {
                var spotifyRes = "" + "\nArtist(s): " + response.tracks.items[i].artists[0].name +
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                console.log(spotifyRes);
            }
        })

        .catch(function (error) {
            console.log(error);
        });
}


function movieThis(inputVal) {
    if (!inputVal) {
        value = "mr nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            var movieRes =
                "" +
                "\nMovie Title: " + response.data.Title +
                "\nYear of Release: " + response.data.Year +
                "\nIMDB Rating: " + response.data.imdbRating +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\nCountry Produced: " + response.data.Country +
                "\nLanguage: " + response.data.Language +
                "\nPlot: " + response.data.Plot +
                "\nActors/Actresses: " + response.data.Actors;
            console.log(movieRes);
        })
        .catch(function (error) {
            console.log(error);
        });
}


function doWhatItSays(inputVal) {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(',');
        spotifySong(dataArr[0], dataArr[1]);
    })
}