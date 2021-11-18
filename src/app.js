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

search("Bangkok");
