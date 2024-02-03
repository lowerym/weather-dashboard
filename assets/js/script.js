var APIkey = "aad29e9f536c08c7d583250641f40a35";
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

fetch(queryURL);
