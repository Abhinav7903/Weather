// Cache DOM elements
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const showRes = document.getElementById('show_res');

// OpenWeather API key
const apiKey = 'f2f6f0f4e1d43a7af332ee5ee0090cb0';
const text = ["Go outside and check the weather! ", "Touch some grass bro", "What are you doing inside?", "Go out and enjoy the day!"];
// Add click event listener
searchButton.addEventListener('click', function () {
    const inputValue = searchInput.value.trim();
    
    if (inputValue === '') {
        alert('Please enter a city name.');
    } else {
        // Fetch weather data from the OpenWeather API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                // Handle and display weather data
                displayWeather(data);
                var randomIndex = Math.floor(Math.random() * text.length);
                alert(text[randomIndex]);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }
});



// Display weather data
function displayWeather(data) {
    // Get the city name
    const { name } = data;
    // Get the country name
    const { country } = data.sys;
    // Get the current temperature in Celsius
    const { temp } = data.main;
    // Get the weather description
    const { description } = data.weather[0];
    // Get the weather icon
    const { icon } = data.weather[0];

    // Create a new date object
    const date = new Date();
    // Get the date
    const today = date.toDateString();

    // Display weather data in the DOM
    showRes.innerHTML = `
        <div class="city">${name}, ${country}</div>
        <div class="date">${today}</div>
        <div class="temp">${Math.round(temp)}°C</div>
        <div class="weather">${description}</div>
        <div class="icon"><img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon"></div>
    `;
}
