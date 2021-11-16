function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = (date.getHours() < 10 ? `0` : ``) + date.getHours();
  let minutes = (date.getMinutes()<10? `0` : ``) + date.getMinutes();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  let day = days[date.getDay()];

  let sentence = `${day} ${hours}:${minutes}`;
  console.log(sentence)
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
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "15b6771cede26fdda2ef2045a9e7c815";
// city = "Stuttgart";
// apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stuttgart&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(showTemperature);

//////////////////////////////////////////

function getCity() {
  let city = document.querySelector("input.value");
  console.log(input);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);
