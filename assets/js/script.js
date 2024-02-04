// Global variable
var searchBtn = document.getElementById("searchBtn");
var searchHistory = document.getElementById("searchHistory");
var APIkey = "aad29e9f536c08c7d583250641f40a35";
var savedSearches = [];

var currentWeather = function(cityValue) {
  fetch ("http://api.openweathermap.org/geo/1.0/direct?q=" + cityValue + "&appid="+ APIkey)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (var i = 0; i < data.length; i++) {
      var cityLat = data[i].lat;
      var cityLon = data[i].lon;
    }
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + APIkey)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var currentCity = $("#currentCity");
      var currentDay = dayjs().format("M/D/YYYY");
      currentCity.text(`${cityValue} (${currentDay})`);
      var currentIcon = $("#currentWeatherIcon");
      var currentIconCode = response.weather[0].icon;
      currentIcon.attr("src", `https://openweathermap.org/img/wn/${currentIconCode}@2x.png`);

      var currentTemp = $("#currentTemp");
      currentTemp.text("Temp: " + response.main.temp + " \u00B0F");

      var currentWind = $("#currentWind");
      currentWind.text("Wind: " + response.wind.speed + " mph");

      var currentHumd = $("#currentHumd");
      currentHumd.text("Humidity: " + response.main.humidity + "%");
    })
  })
}

// Runs API with city from search
function getAPI(cityValue){
  fetch ("http://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=" + APIkey)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
}

// Adds event listener when search button is clicked
searchBtn.addEventListener("click", function(){
  event.preventDefault();
  const city = document.getElementById("citySearch");
  const cityValue = city.value;
  console.log(cityValue);
  getAPI(cityValue);
  $("#weatherInfo").removeClass("hidden");
  if (cityValue === "") {
    alert("Please enter a valid city name.");
    event.preventDefault();
  } else {
    currentWeather(cityValue);
  }
});
