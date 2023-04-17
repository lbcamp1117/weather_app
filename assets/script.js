// Get elements from DOM
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const cityList = document.getElementById('city-list');

// Add event listener to form submit
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    searchCityWeather(city);
    cityInput.value = '';
  }
});

// Search city weather
function searchCityWeather(city) {
  // Make API call to get weather information
  const apiKey = '88fcb4b1e8a9d1b35996ef1d1b3aacdc';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        alert('City not found. Please try again.');
        return;
      }
      const cityWeather = {
        name: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description
      };
      // Add city weather to local storage
      addToLocalStorage(cityWeather);
      // Display city weather in the list
      displayCityWeather(cityWeather);
    })
    
}

// Add city weather to local storage
function addToLocalStorage(cityWeather) {
  console.log(cityWeather);
  let cities = JSON.parse(localStorage.getItem('cities')) || [];
  cities.push(cityWeather);
  if (cities.length > 5)  
    cities.splice(0, 1); // Remove the oldest city if there are more than 5 cities
    localStorage.setItem('cities', JSON.stringify(cities));
  }
  
  // Display city weather in the list
  // Display city weather in the list
function displayCityWeather(cityWeather) {
  console.log(cityWeather);

  // Add dynamic city name to welcome message
  const city = document.getElementById("city");
  welcome = document.createElement("h2");
  welcome.innerHTML = "Weather in " + cityWeather.name;
  city.replaceChildren();
  city.appendChild(welcome);

  // Create the ui for weather
  const weatherList = document.createElement("ui");
  weatherList.setAttribute('id','weather');
  city.appendChild(weatherList); 

  // Listing weather information for city
  element = document.getElementById("weather");

  // Listing temperature information for city
  const cityTemp = document.createElement("li");
  cityTemp.classList.add('city-item');
  cityTemp.innerText = "The current temperature in this city is " + cityWeather.temperature + " Celcius.";
  element.appendChild(cityTemp);


  // Listing weather description information for city
  const cityDesc = document.createElement("li");
  cityDesc.classList.add('city-item');
  cityDesc.innerText = "The current weather in this city is " + cityWeather.description + ".";
  element.appendChild(cityDesc);
  

  cityWeather
  
}
   
  // Load cities from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
  let cities = JSON.parse(localStorage.getItem('cities')) || [];
  cities.forEach(city => {
    displayCityWeather(city);
  });
  });
