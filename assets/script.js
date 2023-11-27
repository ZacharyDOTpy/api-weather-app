// Fetch request for weather forecast
function getGeoWeather(lat, lon) {
  fetch('api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=e869921654196b8684a99705332290bf&units=imperial')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    })
};
// Fetch request for city data
function getCityGeoData(city) {
  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=e869921654196b8684a99705332290bf')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      getGeoWeather(data[0].lat, data[0].lon);
    })
};