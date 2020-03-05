//jshint esversion:6
const express = require('express');
const app = express();
const https = require('https');


app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req, res) {
var city = parseInt(req.body.city);//this bit isn't right
});

app.get("/", function (req, res) {
const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+',uk&appid=72ca549a417332c9609703e8a5a569b3&units=metric';
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      var weatherData = JSON.parse(data); //changes raw data to json
      var temp = weatherData.main.temp;

      var weatherDescription = weatherData.weather[0].description;
      var icon = weatherDescription.weather[0].icon;

      res.write("The temperature in Glasgow is " + temp);
      res.write( "The weather is " + weatherDescription);
      res.write("img src=http://openweathermap.org/img/wn/"+icon+"@2x.png");
      res.send();

    //   const object = { //javascript object to demo what we will use later
    //   name:"Paul",
    //   favFood:"Fajitas"
    // };
    //
    //   console.log(JSON.stringify(object));
    });
  });
});

app.listen(3000, function(){
  console.log("Server started");
});
