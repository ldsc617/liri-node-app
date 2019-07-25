//required packages
require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var moment = require('moment');
var axios = require('axios');
var fs = require('fs');

//user input vars
var command = process.argv[2];
var input = process.argv[3];

switch (command) {
    case "concert-this":
        concertThis(value);
        break;
    case "spotify-this-song":
        spotifySong(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    case "do-what-it-says":
        doThis(value);
        break;
};

// commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

function spotifySong(value) {
    if (!value) {
        value = "The Sign";
    }
    spotify
        .search({
            type: 'track',
            query: value
        })
        .then(function (response) {
            for (var i = 0; i < 5; i++) {
                var spotifyResults =
                    "--------------------------------------------------------------------" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name +
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;

                console.log(spotifyResults);
            }
        })
        .catch(function (err) {
            console.log(err);
        });


function doThis(value) {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(',');
        spotifySong(dataArr[0], dataArr[1]);
    })
};