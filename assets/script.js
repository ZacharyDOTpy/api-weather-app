const API_KEY = 'e869921654196b8684a99705332290bf';
const BASE_PATH = 'http://api.openweathermap.org';
const GEO_PATH = '/geo/1.0/direct';
const WEATHER_PATH = '/data/2.5/weather';
const FORECAST_PATH = '/data/2.5/forecast';

const searchForm = document.querySelector('#city-search');
const inputEl = document.querySelector('#q');
const weatherEl = document.querySelector('#current-weather');
const cityContainer = document.querySelector('#cities');
const forecastContainer = document.querySelector('#weather-forecast');

const testLat = 32.2228765;
const testLon = -110.9748477;
const testCity = 'Tucson';

function getGeoCoding() {
  fetch(`${BASE_PATH}${GEO_PATH}?appid=${API_KEY}&limit=1&q=${testCity}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
}

function getCurrentWeather() {
  fetch(`${BASE_PATH}${WEATHER_PATH}?appid=${API_KEY}&lat=${testLat}&lon=${testLon}&units=imperial`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data.name);
      console.log(data.main.temp);
      console.log(data.main.humidity);
      console.log(data.wind.speed);
    });
}

function getFiveDayForecast() {
  fetch(`${BASE_PATH}${FORECAST_PATH}?appid=${API_KEY}&lat=${testLat}&lon=${testLon}&units=imperial`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
}

getCurrentWeather();