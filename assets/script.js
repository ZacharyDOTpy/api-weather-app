// Fetch request for city data
function getCityGeoData(city) {
  fetch('http://api.openweathermap.org/geo/1.0/direct?appid=e869921654196b8684a99705332290bf&limit=1&q=' + city)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    getGeoWeather(data[0].lat, data[0].lon);
  })
};

// Fetch request for weather forecast
function getGeoWeather(lat, lon) {
  fetch('api.openweathermap.org/data/2.5/forecast?appid=e869921654196b8684a99705332290bf&lat=' + lat + '&lon=' + lon + '&units=imperial')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
// Variables for current days weather data
      var weatherInfo = data.weather;
      console.log(weatherInfo)

      var tempInfo = data.main.temp;
      console.log(tempInfo)

      var windInfo = data.wind.speed;
      console.log(windInfo)

      var humidInfo = data.main.humidity;
      console.log(humidInfo)

      var iconInfo = data.weather[0].icon;

    })
};

/* <div class="card-body" id="card1">
  <h5 class="card-title" id="card1-date">Card title</h5>
    <p class="card-text" id="card1-icon"></p>
    <p class="card-text" id="card1-temp">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <p class="card-text" id="card1-wind"></p>
    <p class="card-text" id="card1-humid"></p> */