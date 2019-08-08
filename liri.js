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
    default: console.log("Wrong command! Try one of these: node liri.js concert-this  node liri.js spotify-this   node liri.js  movie-this  node liri.js do-what-it-says")
        break;
};

