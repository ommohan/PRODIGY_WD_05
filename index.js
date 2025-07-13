------<Javascript Code>-------

function ucFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : '';
}

function getWeather(city = 'London') {
  const apiKey = '320b5ed7aee20b24e7e3f5c5a7bb919a';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      if (data.cod !== 200) throw new Error(data.message);

      document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}°`;
      document.querySelector('.city').innerHTML = data.name;
      document.querySelector('.icon-img').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon"/>`;
      document.querySelector('.description').innerHTML = ucFirst(data.weather[0].description);
      document.querySelector('.feels_like').innerHTML = `Feels like: ${Math.round(data.main.feels_like)}°`;
      document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
      document.querySelector('.pressure').innerHTML = `Pressure: ${data.main.pressure} hPa`;
      document.querySelector('.wind').innerHTML = `Wind: ${data.wind.speed} m/s`;
    })
    .catch(error => {
      alert('Error fetching weather: ' + error.message);
      console.error('Weather fetch error:', error);
    });
}

function f1() {
  const city = document.getElementById('city').value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert('Please enter a city name!');
  }
}
