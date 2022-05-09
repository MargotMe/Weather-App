//Feature 1
function formatTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novvember",
    "December",
  ];
  let month = months[date.getMonth()];
  let dates = date.getDate();
  let year = date.getFullYear();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${month} ${dates} ${year} | ${hour}:${minutes}`;
}
let currentDate = document.querySelector("#today-date");
let currentTime = new Date();
currentDate.innerHTML = formatTime(currentTime);
//Feature 2
function getCityName(city) {
  let apiKey = "217895888a8a82d7a319bd5f397a4ae3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function showWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temp-num").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-feels").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.weather[0].description);
  function formatSunriseTime(timestamp) {
    let date = new Date(timestamp);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let sunriseElement = document.querySelector("#sunrise-time");
    sunriseElement.innerHTML = `${hours}:${minutes}`;
  }
  formatSunriseTime(response.data.sys.sunrise * 1000);

  function formatSunsetTime(timestamp) {
    let date = new Date(timestamp);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let sunsetElement = document.querySelector("#sunset-time");
    sunsetElement.innerHTML = `${hours}:${minutes}`;
  }
  formatSunsetTime(response.data.sys.sunset * 1000);
  getForecast(response.data.coord);
}

let inputCity = document.querySelector("#city-input");
inputCity.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  getCityName(city);
}
getCityName("Paris");
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", displayCurrentLocation);

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "217895888a8a82d7a319bd5f397a4ae3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 following-days">
        <div class="card-odd">
          <h5 class="weather-forecast-day">${formatDay(forecastDay.dt)}</h5>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" class="card-img-top" alt="weather-icon" />
          <div class="card-body">
            <h4 class="temp-days">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}º </span>|
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}º</span>
            </h4>
          </div>
        </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "217895888a8a82d7a319bd5f397a4ae3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Feature 3
let celsiusUnit = document.querySelector("#celsius-unit");
let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
function celsiusTemp(event) {
  event.preventDefault();
  let tempNum = document.querySelector("#temp-num");
  tempNum.innerHTML = Math.round(celsiusTemperature);
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
}
celsiusUnit.addEventListener("click", celsiusTemp);
function fahrenheitTemp(event) {
  event.preventDefault();
  let tempNum = document.querySelector("#temp-num");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempNum.innerHTML = Math.round(farenheitTemperature);
  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
}
fahrenheitUnit.addEventListener("click", fahrenheitTemp);

let celsiusTemperature = null;
