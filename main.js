const api = {
  key: "4b5c6f640298f381d64a8a4857bd2c2c",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `L: ${Math.round(weather.main.temp_min)}°F / H: ${Math.round(weather.main.temp_max)}°F`;

  let wind = document.querySelector('.current .wind');
  wind.innerText = `Wind: ${Math.round(weather.wind.speed)} miles/hour`;

  let message = document.querySelector('.current .message');
  message.innerText = sendMessage();

    function sendMessage () {
      var str = 'Note: '
      if (parseInt(temp.innerText) > 70) {
        return str += 'Going to get warm, you don\'t need a jacket.';
      } else if (parseInt(temp.innerText) < 35) {
        return str += 'Brrrr, it\'s so cold. Time to bring out that winter jacket.';
      } else {
        return str += 'Bring a light jacket just in case.'
      }
    }
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${month} ${date}, ${year}`;
}