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
var input = process.argv[3];



if (process.argv.length > 3){

    for(var i = 3; i<process.argv.length; i++){
        command += " " + process.argv[i];
        
    }
    command = command.trim();
}


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

function concertFunc(artist){
    
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
   

    axios.get(url).then(function(response){
        console.log(artist);
        for(var i =0; i< response.data.length; i++){
            console.log("Name of venue: " +response.data[i].venue.name);
            console.log("Located in " +response.data[i].venue.city + " " + response.data[i].venue.country);
            var date = moment(response.data[i].datetime).format("MM/DD/YYYY HH:mm:ss");
            console.log("Date of concert: " +date + "\n");
        }

    });

}

function spotifyFunc(songName){
    if(songName == ""){
        songName = "Ace of Base";
    }

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        

      console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
      console.log("Song name: " + data.tracks.items[0].name);
      console.log("Link: " + data.tracks.items[0].external_urls.spotify);
      console.log("Album: " + data.tracks.items[0].album.name);
  
      });

}