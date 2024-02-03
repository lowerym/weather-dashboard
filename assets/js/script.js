var searchBtn = document.getElementById("searchBtn")
var APIkey = "aad29e9f536c08c7d583250641f40a35";

  function getAPI(city){
    fetch ("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid="+ APIkey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      });

  }

  searchBtn.addEventListener("click", function(){
    var city = document.querySelector("#citySearch").value
    getAPI(city);
  })
