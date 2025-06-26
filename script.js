"use strict";

const WEATHER_API_KEY = "20cf7cc3ef1905f013c409e09238aca4";

const getWeather = (location) => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}&units=metric`;

    fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => {
            const { name, main, weather, wind } = data;
            const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

            document.getElementById("weather-data").innerHTML = `
                <h4>${name}</h4>
                <img src="${iconUrl}" alt="${weather[0].description}">
                <p><strong>${weather[0].description.toUpperCase()}</strong></p>
                <p>🌡️ Temp: ${main.temp}°C (Feels like: ${main.feels_like}°C)</p>
                <p>💧 Humidity: ${main.humidity}%</p>
                <p>💨 Wind Speed: ${wind.speed} m/s</p>
            `;
        })
        .catch(err => {
            document.getElementById("weather-data").innerHTML = `<p class="text-danger">${err.message}</p>`;
        });
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("location-form").addEventListener("submit", event => {
        event.preventDefault();
        const location = document.getElementById("location-input").value.trim();
        if (!location) {
            alert("Please enter a city name.");
            return;
        }
        getWeather(location);
    });
});
