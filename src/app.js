////////Date & Weather Data//////////////

function formatDate() {
  let date = new Date();
  let hours = (date.getHours() < 10 ? `0` : ``) + date.getHours();
  let minutes = (date.getMinutes() < 10 ? `0` : ``) + date.getMinutes();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#actual-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#search-city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate();

  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `img/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  console.log(response.data.weather[0].icon);

  getforecast(response.data.coord);
}

/////////////Search Formula ////////////////

function search(city) {
  let apiKey = "15b6771cede26fdda2ef2045a9e7c815";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

/////////////conversion Celsius Fahrenheit ////////////////

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.add("passiv");
  fahrenheitLink.classList.remove("passiv");
  let temperatureElement = document.querySelector("#actual-temp");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.remove("passiv");
  fahrenheitLink.classList.add("passiv");
  let temperatureElement = document.querySelector("#actual-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

/////////////Current Position ////////////////

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "15b6771cede26fdda2ef2045a9e7c815";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlCurrent).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#btn-current");
currentButton.addEventListener("click", getCurrentPosition);

search("Melbourne");

/////////////Forecast ////////////////

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row justify-content-evenly">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2 border-box forecast-small">
            <h3>${formatDay(forecastDay.dt)}
            <img src="img/${
              forecastDay.weather[0].icon
            }.png" alt="${
          forecastDay.weather[0].description
        }" class ="icon-forecast" id="icon">
            </h3>
            <p>
              <span class="forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}°</span> /
              <span class="forecast-temp-min"> ${Math.round(
                forecastDay.temp.min
              )}°</span>
            </p>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getforecast(coordinates) {
  let apiKey = "15b6771cede26fdda2ef2045a9e7c815";
  let lonForecast = coordinates.lon;
  let latForecast = coordinates.lat;
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latForecast}&lon=${lonForecast}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlForecast).then(displayForecast);
}
