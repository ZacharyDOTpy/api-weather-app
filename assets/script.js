var date = dayjs().format();

var currentCity = document.getElementById('main-card-city');
var currentDate = document.getElementById('main-card-date');
var currentTemp = document.getElementById('main-card-temp');
var currentWind = document.getElementById('main-card-wind');
var currentIcon = document.getElementById('main-card-icon');
var currentHumid = document.getElementById('main-card-humid');


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

// Fetch request for current weather forecast
function getGeoWeather(lat, lon) {
  fetch('http://api.openweathermap.org/data/2.5/weather?appid=e869921654196b8684a99705332290bf&lat=' + lat + '&lon=' + lon + '&units=imperial')
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
// Applies text content to main card
      currentCity.textContent = data.name;
      currentDate.textContent = dayjs().format('MMM/DD/YYYY');
      currentTemp.textContent = 'Temp: ' + tempInfo;
      currentWind.textContent = 'Wind: ' + windInfo;
      currentHumid.textContent = 'Humidity: ' + humidInfo;
      currentIcon.setAttribute('src', 'http://openweathermap.org/img/w/' + iconInfo + '.png'); 
    })
};
// Fetch request for weeks weather forecast
function getWeekForcast(lat, lon) {
  fetch('http://api.openweathermap.org/data/2.5/forecast?appid=e869921654196b8684a99705332290bf&lat=' + lat + '&lon=' + lon + '&units=imperial')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
// Variables for day 1 weather data
      var dateDay1 = data.list[11].dt_txt;
      console.log(dateDay1)
      var weatherDay1 = data.list[11].weather;
      console.log(weatherDay1)
      var tempDay1 = data.list[11].main.temp;
      console.log(tempDay1)
      var windDay1 = data.list[11].wind.speed;
      console.log(windDay1)
      var humidDay1 = data.list[11].main.humidity;
      console.log(humidDay1)
      var iconDay1 = data.list[11].weather[0].icon;
// Applies text content for day 1 card
      document.getElementById('card1-date').textContent.dayjs(dateDay1).format('M/D/YYYY');
      document.getElementById('card1-icon').setAttribute('src', 'http://openweathermap.org/img/w/' + iconDay1 + '.png')
      document.getElementById('card1-temp').textContent = 'Temp: ' + tempDay1;
      document.getElementById('card1-wind').textContent = 'Wind: ' + windDay1;
      document.getElementById('card1-humid').textContent = 'Humidity: ' + humidDay1;
      
// Variables for day 2 weather data
      var dateDay2 = data.list[19].dt_txt;
      console.log(dateDay1)
      var weatherDay2 = data.list[19].weather;
      console.log(weatherDay1)
      var tempDay2 = data.list[19].main.temp;
      console.log(tempDay1)
      var windDay2 = data.list[19].wind.speed;
      console.log(windDay1)
      var humidDay2 = data.list[19].main.humidity;
      console.log(humidDay1)
      var iconDay2 = data.list[19].weather[0].icon;
// Applies text content for day 2 card
      document.getElementById('card1-date').textContent.dayjs(dateDay2).format('M/D/YYYY');
      document.getElementById('card1-icon').setAttribute('src', 'http://openweathermap.org/img/w/' + iconDay2 + '.png')
      document.getElementById('card1-temp').textContent = 'Temp: ' + tempDay2;
      document.getElementById('card1-wind').textContent = 'Wind: ' + windDay2;
      document.getElementById('card1-humid').textContent = 'Humidity: ' + humidDay2;
    })
}