//jshint esversion:6

const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
const query = req.body.cityName;
const apiKey ="72ca549a417332c9609703e8a5a569b3";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

// const url = "https://api.openweathermap.org/data/2.5/weather?q=Glasgow,uk&appid=8b656d1dbc6b12d0c93aa620c48eb1c3&units=metric";
https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
    var weatherData = JSON.parse(data);
var temp = weatherData.main.temp;
console.log(temp);

var desc = weatherData.weather[0].description;
console.log(desc);

var icon = weatherData.weather[0].icon;
console.log(icon);

res.write("<h1>Temperature in "+query+" is: "+temp+" degree.</h1>");
res.write("<p>The Temperature currently is: "+desc+"</p>");
res.write("<img src='http://openweathermap.org/img/wn/"+icon+"@2x.png'>");
res.send();
  });
});

});

app.listen(3000,function(){
  console.log("Server started on port 3000");
});
