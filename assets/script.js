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

function getGeoCoding(city) {
  fetch(`${BASE_PATH}${GEO_PATH}?appid=${API_KEY}&limit=1&q=${city}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const lat = data[0].lat;
      const lon = data[0].lon;

      getCurrentWeather(lat, lon);
      getFiveDayForecast(lat, lon);

      const cityButton = document.createElement('button');
      cityButton.textContent = city;
      cityButton.className = 'btn btn-lg btn-secondary mb-3 w-100';
      cityContainer.appendChild(cityButton);
    });
}

function getCurrentWeather(lat, lon) {
  fetch(`${BASE_PATH}${WEATHER_PATH}?appid=${API_KEY}&lat=${lat}&lon=${lon}&units=imperial`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      weatherEl.innerHTML = null;

      const weatherIcon = data.weather[0].icon;
      
      const h4El = document.createElement('h4');
      h4El.textContent = data.name;
      h4El.className = 'card-title';
      weatherEl.appendChild(h4El);

      const iconEl = document.createElement('img');
      iconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + weatherIcon + '.png');
      weatherEl.appendChild(iconEl);

      const tempEl = document.createElement('p');
      tempEl.textContent = 'Temperature: ' + data.main.temp;
      tempEl.className = 'card-text';
      weatherEl.appendChild(tempEl);

      const humidEl = document.createElement('p');
      humidEl.textContent = 'Humidity: ' + data.main.humidity;
      humidEl.className = 'card-text';
      weatherEl.appendChild(humidEl);

      const windEl = document.createElement('p');
      windEl.textContent = 'Wind Speed: ' + data.wind.speed;
      windEl.className = 'card-text';
      weatherEl.appendChild(windEl);
    });
}

function getFiveDayForecast(lat, lon) {
  fetch(`${BASE_PATH}${FORECAST_PATH}?appid=${API_KEY}&lat=${lat}&lon=${lon}&units=imperial`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      forecastContainer.innerHTML = null;

      for (let i = 4; i < data.list.length; i = i + 8) {
        const weather = data.list[i];
        const weatherIcon = data.list[i].weather[0].icon;

        const colEl = document.createElement('div');
        colEl.className = 'col-12 col-xl';
        forecastContainer.append(colEl);

        const cardEl = document.createElement('div');
        cardEl.className = 'card m-3 p-3';
        colEl.append(cardEl);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardEl.append(cardBody);

        const h4El = document.createElement('h4');
        h4El.textContent = weather.dt_txt;
        h4El.className = 'card-title';
        cardBody.appendChild(h4El);

        const iconEl = document.createElement('img');
        iconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + weatherIcon + '.png');
        cardBody.appendChild(iconEl);

        const tempEl = document.createElement('p');
        tempEl.textContent = 'Temperature: ' + weather.main.temp;
        tempEl.className = 'card-text';
        cardBody.appendChild(tempEl);

        const humidEl = document.createElement('p');
        humidEl.textContent = 'Humidity: ' + weather.main.humidity;
        humidEl.className = 'card-text';
        cardBody.appendChild(humidEl);

        const windEl = document.createElement('p');
        windEl.textContent = 'Wind Speed: ' + weather.wind.speed;
        windEl.className = 'card-text';
        cardBody.appendChild(windEl);
      }
    });
}

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  getGeoCoding(inputEl.value.trim());
});