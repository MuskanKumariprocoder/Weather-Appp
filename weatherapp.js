const API_KEY = "e2262866d95a8efb5e67d46ffb738f6f";
const weather = document.querySelector("#weather");
const form = document.querySelector("form");
const search = document.querySelector("#search");

const getWeather = async (city) => {
    weather.innerHTML = "<h2>Loading...</h2>";
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === "404") {
            weather.innerHTML = `<h2>City not found</h2>`;
        } else {
            showWeather(data);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weather.innerHTML = `<h2>Error fetching weather data</h2>`;
    }
};

const showWeather = (data) => {
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp}°C</h2>
            <h4>${data.weather[0].main}</h4>
        </div>
    `;
};

form.addEventListener("submit", function(event) {
    getWeather(search.value.trim()); // Trim whitespace from the input value
    event.preventDefault(); // Prevent default form submission
});
