// var date = dayjs().format();

var currentCity = document.getElementById("main-card-city");
var currentDate = document.getElementById("main-card-date");
var currentTemp = document.getElementById("main-card-temp");
var currentWind = document.getElementById("main-card-wind");
var currentIcon = document.getElementById("main-card-icon");
var currentHumid = document.getElementById("main-card-humid");

var searchBtn = document.getElementById("search-btn");
var cityForcast;

// Event listener for search button
searchBtn.addEventListener("click", userInput);

// Function for user form input
function userInput(event) {
  event.preventDefault();
  var citySearch = document.getElementById("city-search").value;

  lastCity = citySearch;
  cityForcast = citySearch;

  // Fetch request for city data
  function getCityGeoData(city) {
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?appid=e869921654196b8684a99705332290bf&limit=1&q=" +
        city
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        // Variables for city data
        var location = data[0].name;
        console.log("City: " + location);
        var locationLat = data[0].lat;
        console.log("Lat: " + locationLat);
        var locationLon = data[0].lon;
        console.log("Lon: " + locationLon);

        getGeoWeather(locationLat, locationLon);
        getGeoForcast(locationLat, locationLon);
      });
  }
  getCityGeoData();
  searchHistory();
}

// Fetch request for current weather forecast
function getGeoWeather(lat, lon) {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?appid=e869921654196b8684a99705332290bf&lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Variables for current days weather data
      var weatherInfo = data.weather;
      console.log(weatherInfo);

      var tempInfo = data.main.temp;
      console.log(tempInfo);

      var windInfo = data.wind.speed;
      console.log(windInfo);

      var humidInfo = data.main.humidity;
      console.log(humidInfo);

      var iconInfo = data.weather[0].icon;
      // Applies text content to main card
      currentCity.textContent = data.name;
      currentDate.textContent = dayjs().format("MMM/DD/YYYY");
      currentTemp.textContent = "Temp: " + tempInfo;
      currentWind.textContent = "Wind: " + windInfo;
      currentHumid.textContent = "Humidity: " + humidInfo;
      currentIcon.setAttribute(
        "src",
        "http://openweathermap.org/img/w/" + iconInfo + ".png"
      );
    });
}
// Fetch request for weeks weather forecast
function getGeoForcast(lat, lon) {
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast?appid=e869921654196b8684a99705332290bf&lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // Variables for day 1 weather data
      var dateDay1 = data.list[11].dt_txt;
      console.log(dateDay1);
      var tempDay1 = data.list[11].main.temp;
      console.log(tempDay1);
      var windDay1 = data.list[11].wind.speed;
      console.log(windDay1);
      var humidDay1 = data.list[11].main.humidity;
      console.log(humidDay1);
      var iconDay1 = data.list[11].weather[0].icon;
      // Applies text content to day 1 card
      document
        .getElementById("card1-date")
        .textContent.dayjs(dateDay1)
        .format("M/D/YYYY");
      document
        .getElementById("card1-icon")
        .setAttribute(
          "src",
          "http://openweathermap.org/img/w/" + iconDay1 + ".png"
        );
      document.getElementById("card1-temp").textContent = "Temp: " + tempDay1;
      document.getElementById("card1-wind").textContent = "Wind: " + windDay1;
      document.getElementById("card1-humid").textContent =
        "Humidity: " + humidDay1;

      // Variables for day 2 weather data
      var dateDay2 = data.list[19].dt_txt;
      console.log(dateDay2);
      var tempDay2 = data.list[19].main.temp;
      console.log(tempDay2);
      var windDay2 = data.list[19].wind.speed;
      console.log(windDay2);
      var humidDay2 = data.list[19].main.humidity;
      console.log(humidDay2);
      var iconDay2 = data.list[19].weather[0].icon;
      // Applies text content to day 2 card
      document
        .getElementById("card1-date")
        .textContent.dayjs(dateDay2)
        .format("M/D/YYYY");
      document
        .getElementById("card1-icon")
        .setAttribute(
          "src",
          "http://openweathermap.org/img/w/" + iconDay2 + ".png"
        );
      document.getElementById("card1-temp").textContent = "Temp: " + tempDay2;
      document.getElementById("card1-wind").textContent = "Wind: " + windDay2;
      document.getElementById("card1-humid").textContent =
        "Humidity: " + humidDay2;

      // Variables for day 3 weather data
      var dateDay3 = data.list[27].dt_txt;
      console.log(dateDay3);
      var tempDay3 = data.list[27].main.temp;
      console.log(tempDay3);
      var windDay3 = data.list[27].wind.speed;
      console.log(windDay3);
      var humidDay3 = data.list[27].main.humidity;
      console.log(humidDay3);
      var iconDay3 = data.list[27].weather[0].icon;
      // Applies text content to day 3 card
      document
        .getElementById("card1-date")
        .textContent.dayjs(dateDay3)
        .format("M/D/YYYY");
      document
        .getElementById("card1-icon")
        .setAttribute(
          "src",
          "http://openweathermap.org/img/w/" + iconDay3 + ".png"
        );
      document.getElementById("card1-temp").textContent = "Temp: " + tempDay3;
      document.getElementById("card1-wind").textContent = "Wind: " + windDay3;
      document.getElementById("card1-humid").textContent =
        "Humidity: " + humidDay3;

      // Variables for day 4 weather data
      var dateDay4 = data.list[35].dt_txt;
      console.log(dateDay4);
      var tempDay4 = data.list[35].main.temp;
      console.log(tempDay4);
      var windDay4 = data.list[35].wind.speed;
      console.log(windDay4);
      var humidDay4 = data.list[35].main.humidity;
      console.log(humidDay4);
      var iconDay4 = data.list[35].weather[0].icon;
      // Applies text content to day 4 card
      document
        .getElementById("card1-date")
        .textContent.dayjs(dateDay4)
        .format("M/D/YYYY");
      document
        .getElementById("card1-icon")
        .setAttribute(
          "src",
          "http://openweathermap.org/img/w/" + iconDay4 + ".png"
        );
      document.getElementById("card1-temp").textContent = "Temp: " + tempDay4;
      document.getElementById("card1-wind").textContent = "Wind: " + windDay4;
      document.getElementById("card1-humid").textContent =
        "Humidity: " + humidDay4;

      // Variables for day 5 weather data
      var dateDay5 = data.list[39].dt_txt;
      console.log(dateDay5);
      var tempDay5 = data.list[39].main.temp;
      console.log(tempDay5);
      var windDay5 = data.list[39].wind.speed;
      console.log(windDay5);
      var humidDay5 = data.list[39].main.humidity;
      console.log(humidDay5);
      var iconDay5 = data.list[39].weather[0].icon;
      // Applies text content to day 5 card
      document
        .getElementById("card1-date")
        .textContent.dayjs(dateDay5)
        .format("M/D/YYYY");
      document
        .getElementById("card1-icon")
        .setAttribute(
          "src",
          "http://openweathermap.org/img/w/" + iconDay5 + ".png"
        );
      document.getElementById("card1-temp").textContent = "Temp: " + tempDay5;
      document.getElementById("card1-wind").textContent = "Wind: " + windDay5;
      document.getElementById("card1-humid").textContent =
        "Humidity: " + humidDay5;
    });
}

var lastCity = "";
var historyList = { city: [] };

// Function to save search to local storage
function searchHistory() {
  historyList.city.push(lastCity);
  localStorage.setItem("history", JSON.stringify(historyList));
}

// Function to get history from local storage
function getHistory() {
  for (i = 0; i < 10; i++) {
    historyList = JSON.parse(localStorage.getItem("history")) || { city: [] };
  }
}

getHistory()

