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
    })
};
