// Global variable
var APIkey = "aad29e9f536c08c7d583250641f40a35";
var searchForm = document.getElementById("searchForm");
var citySearchEl = document.getElementById("citySearch");
var searchHistory = document.getElementById("searchHistory");
var weatherInfoEl = document.getElementById("weatherInfo");
var futureWeatherEl = document.getElementById("futureInfo");
var futureContainerEl = document.getElementById("futureContainer");
var clearBtn = document.getElementById("clearHistory");

function weatherSearch(cityValue) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=" + APIkey + "&units=imperial";

  fetch(queryURL).then(function(response) {
    if (response.ok){
      response.json().then(function(data){
        displayWeatherInfo(data);
        saveSearchHistory(cityValue);
      })
    }
  });

  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityValue + "&appid=" + APIkey + "&units=imperial";

  fetch(forecastURL).then(function(response){
    if (response.ok){
      response.json().then(function(data){
        showForecast(data);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

function displayWeatherInfo(data) {
  var city = data.name;
  var date = new Date(data.dt * 1000).toLocaleDateString();
  var iconURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  var temp = data.main.temp;
  var humd = data.main.humidity;
  var wind = data.wind.speed;

  var html = "<h2>" + city + " (" + date + ") " + "<img src='" + iconURL + "' alt='" + data.weather[0].description + "'></h2>" + "<p>Temp: " + temp + " &deg;F</p>" + "<p>Wind: " + wind + " MPH</p>" + "<p>Humidity: " + humd + "%</p>";

  weatherInfoEl.innerHTML = html;
  weatherInfoEl.classList.add("current-weather");
}

function showForecast(data) {
  var forecastItems = data.list.filter(function(item){
    return item.dt_txt.includes("12:00:00");
  });

  var html = "";

  forecastItems.forEach(function(item){
    var date = new Date(item.dt * 1000).toLocaleDateString();
    var iconURL = "https://openweathermap.org/img/w/" + item.weather[0].icon + ".png";
    var temp = item.main.temp;
    var humd = item.main.humidity;
    var wind = item.wind.speed;

    html += "<div class='forecast-item'>" + "<h5>" + date + "</h5>" + "<img src='" + iconURL + "' alt='" + item.weather[0].description + "'>" + "<p>Temp: " + temp + " &deg;F</p>" + "<p>Wind: " + wind + " MPH</p>" + "<p>Humidity: " + humd + "%</p>" + "</div>";
  });

  futureContainerEl.innerHTML = html;
  futureContainerEl.classList.add("forecast");
}

function saveSearchHistory(cityValue) {
  var savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || [];
  savedSearches.push(cityValue);
  var savedSearchesNoDuplicates = [];
  savedSearches.forEach(function(cityValue) {
    if (!savedSearchesNoDuplicates.includes(cityValue)) {
      savedSearchesNoDuplicates.push(cityValue);
    }
  });

  localStorage.setItem("savedSearches", JSON.stringify(savedSearchesNoDuplicates));

  displaySearches();
}

function displaySearches() {
  var savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || [];
  var html = "<hr>";
  savedSearches.forEach(function(cityValue) {
    html += "<button class='button'>" + cityValue + "</button><br/>";
  });

  searchHistory.innerHTML = html;
}

function displayHistoricalWeather(event) {
  var cityValue = event.target.textContent;
  weatherSearch(cityValue);
}

searchHistory.addEventListener("click", displayHistoricalWeather);

displaySearches();

function clearHistory() {
  localStorage.removeItem("savedSearches");
  displaySearches();
};

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

// Adds event listener when search form is submitted
searchForm.addEventListener("submit", function(){
  event.preventDefault();
  weatherInfoEl.classList.remove("hidden");
  futureWeatherEl.classList.remove("hidden");
  var cityValue = citySearchEl.value.trim();
  var cityCapitalized = cityValue.substring(0,1).toUpperCase() + cityValue.substring(1);
  getAPI(cityValue);
  if (cityValue !== "") {
    weatherSearch(cityValue);
  }
});

clearBtn.addEventListener("click", clearHistory);
