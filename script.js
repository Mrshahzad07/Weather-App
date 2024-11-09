const apiKey = '1ec7eb2fee28eab8f415643630a7c653'; // Replace this with your OpenWeatherMap API key
const weatherIcon = document.getElementById('weatherIcon');
const locationDisplay = document.getElementById('location');
const temperatureDisplay = document.getElementById('temperature');
const descriptionDisplay = document.getElementById('description');
const windSpeedDisplay = document.getElementById('windSpeed');
const humidityDisplay = document.getElementById('humidity');
const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');

// Event listener for search button
searchButton.addEventListener('click', () => {
    const city = locationInput.value;
    if (city) {
        fetchWeatherData(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Function to fetch weather data
function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Corrected string interpolation
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            updateWeatherInfo(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

// Function to update weather information on the page
function updateWeatherInfo(data) {
    const location = `${data.name}, ${data.sys.country}`;
    const temperature = `${Math.round(data.main.temp)}°C`;
    const description = data.weather[0].description;
    const windSpeed = `Wind Speed: ${data.wind.speed} m/s`;
    const humidity = `Humidity: ${data.main.humidity}%`;

    // Update DOM elements
    locationDisplay.textContent = location;
    temperatureDisplay.textContent = temperature;
    descriptionDisplay.textContent = description;
    windSpeedDisplay.textContent = windSpeed;
    humidityDisplay.textContent = humidity;

    // Change weather icon based on weather conditions
    const weatherCondition = data.weather[0].main.toLowerCase();
    updateWeatherIcon(weatherCondition);
}

// Function to change weather icon dynamically
function updateWeatherIcon(condition) {
    // Convert the condition string to lowercase to make the comparison case-insensitive
    const lowerCaseCondition = condition.toLowerCase();

    // Ensure weatherIcon is defined and exists
    if (typeof weatherIcon !== 'undefined' && weatherIcon) {
        if (lowerCaseCondition.includes('clear')) {
            weatherIcon.src = 'sun.svg';
        } else if (lowerCaseCondition.includes('clouds')) {
            weatherIcon.src = 'cloud.svg';
        } else if (lowerCaseCondition.includes('rain')) {
            weatherIcon.src = 'rain.svg';
        } else if (lowerCaseCondition.includes('snow')) {
            weatherIcon.src = 'snow.svg';
        } else {
            weatherIcon.src = 'weather.svg'; // Default icon
        }

        // Smooth icon transition
        weatherIcon.classList.add('fade-in');
        setTimeout(() => weatherIcon.classList.remove('fade-in'), 500);
    } else {
        console.error('weatherIcon is not defined or does not exist.');
    }
}
