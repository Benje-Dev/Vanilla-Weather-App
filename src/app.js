function showTemperature(response) {   
document.querySelector("#actual-temp").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
document.querySelector("#wind-speed").innerHTML = Math.round((response.data.wind.speed*3.6));
document.querySelector("#search-city").innerHTML = response.data.name;
document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
}





apiKey = "15b6771cede26fdda2ef2045a9e7c815";
// city = "Stuttgart";
// apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stuttgart&appid=${apiKey}&units=metric`;

console.log(apiUrl)

axios.get(apiUrl).then(showTemperature);






//////////////////////////////////////////

function getCity() {
  city = document.querySelector("input.value");
  console.log(input);
}

searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getCity);