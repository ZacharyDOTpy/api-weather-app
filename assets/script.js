// housekeeping
const API_KEY = "e869921654196b8684a99705332290bf";
const BASE_PATH = "https://api.openweathermap.org";
const GEO_PATH = "/geo/1.0/direct";
const WEATHER_PATH = "/data/2.5/weather";
const FORECAST_PATH = "/data/2.5/forecast";

const searchForm = document.querySelector("#city-search");
const inputEl = document.querySelector("#q");
const weatherEl = document.querySelector("#current-weather");
const historyContainer = document.querySelector("#search-history");
const forecastContainer = document.querySelector("#weather-forecast");

var searchHistory = [];

// geo coding fetch request
function getGeoCoding(city) {
  fetch(`${BASE_PATH}${GEO_PATH}?appid=${API_KEY}&limit=1&q=${city}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const lat = data[0].lat;
      const lon = data[0].lon;

      getCurrentWeather(lat, lon);
      getFiveDayForecast(lat, lon);
      addHistory(city);
    });
}

// current weather fetch request
function getCurrentWeather(lat, lon) {
  fetch(`${BASE_PATH}${WEATHER_PATH}?appid=${API_KEY}&lat=${lat}&lon=${lon}&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      weatherEl.innerHTML = null;
      const weatherIcon = data.weather[0].icon;

// current day card creation
      const h4El = document.createElement("h4");
      h4El.textContent = data.name;
      h4El.className = "card-title";
      weatherEl.appendChild(h4El);

      const iconEl = document.createElement("img");
      iconEl.setAttribute(
        "src",
        "http://openweathermap.org/img/w/" + weatherIcon + ".png"
      );
      weatherEl.appendChild(iconEl);

      const tempEl = document.createElement("p");
      tempEl.textContent = "Temperature: " + data.main.temp + "F";
      tempEl.className = "card-text";
      weatherEl.appendChild(tempEl);

      const humidEl = document.createElement("p");
      humidEl.textContent = "Humidity: " + data.main.humidity + "%";
      humidEl.className = "card-text";
      weatherEl.appendChild(humidEl);

      const windEl = document.createElement("p");
      windEl.textContent = "Wind Speed: " + data.wind.speed + "MPH";
      windEl.className = "card-text";
      weatherEl.appendChild(windEl);
    });
}

// five day forecast fetch request
function getFiveDayForecast(lat, lon) {
  fetch(`${BASE_PATH}${FORECAST_PATH}?appid=${API_KEY}&lat=${lat}&lon=${lon}&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      forecastContainer.innerHTML = null;

      for (let i = 4; i < data.list.length; i = i + 8) {
        const weather = data.list[i];
        const weatherIcon = data.list[i].weather[0].icon;

// five day forecast card creation
        const colEl = document.createElement("div");
        colEl.className = "col-12 col-xl";
        forecastContainer.append(colEl);

        const cardEl = document.createElement("div");
        cardEl.className = "card m-3 p-3 bg-primary text-light";
        colEl.append(cardEl);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardEl.append(cardBody);

        const h4El = document.createElement("h4");
        h4El.textContent = dayjs(weather.dt_txt).format('MM/DD/YYYY');
        h4El.className = "card-title";
        cardBody.appendChild(h4El);

        const iconEl = document.createElement("img");
        iconEl.setAttribute(
          "src",
          "http://openweathermap.org/img/w/" + weatherIcon + ".png"
        );
        cardBody.appendChild(iconEl);

        const tempEl = document.createElement("p");
        tempEl.textContent = "Temperature: " + weather.main.temp + "F";
        tempEl.className = "card-text";
        cardBody.appendChild(tempEl);

        const humidEl = document.createElement("p");
        humidEl.textContent = "Humidity: " + weather.main.humidity + "%";
        humidEl.className = "card-text";
        cardBody.appendChild(humidEl);

        const windEl = document.createElement("p");
        windEl.textContent = "Wind Speed: " + weather.wind.speed + "MPH";
        windEl.className = "card-text";
        cardBody.appendChild(windEl);
      }
    });
}

// event listener for submit button
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  getGeoCoding(inputEl.value.trim());
});

// local storage setItem function
function addHistory(query) {
  if (searchHistory.includes(query)) {
    searchHistory.splice(searchHistory.indexOf(query), 1);
  }
  searchHistory.push(query);

  if (searchHistory.length > 8) {
    searchHistory.splice(0, 1);
  }
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
  displayHistory();
}

// hitory button display function
function displayHistory() {
  historyContainer.innerHTML = null;
  
  for (var query of searchHistory) {
    var historyButton = document.createElement("button");
    historyButton.className = "history-button btn btn-secondary mb-3 w-100";
    historyButton.textContent = query;
    historyButton.addEventListener("click", function () {
      getGeoCoding(this.textContent);
    });
    historyContainer.prepend(historyButton);
  }
}

// display history on load function
function init() {
  searchHistory = JSON.parse(localStorage.getItem("search-history"))
  if (searchHistory === null) searchHistory = []
  console.log(searchHistory);
  displayHistory();
}

init();
