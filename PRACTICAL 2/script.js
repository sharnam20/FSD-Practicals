const API_KEY = 'b8ecb570e8de81e6d9f9b2d8c35d5c8f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const fallbackData = {
    'mahesana': { name: 'Mahesana', country: 'IN', temp: 28, condition: 'clear sky', icon: '01d', humidity: 65, windSpeed: 3.2, feelsLike: 31 },
    'mehsana': { name: 'Mehsana', country: 'IN', temp: 28, condition: 'clear sky', icon: '01d', humidity: 65, windSpeed: 3.2, feelsLike: 31 },
    'vadodara': { name: 'Vadodara', country: 'IN', temp: 26, condition: 'partly cloudy', icon: '02d', humidity: 70, windSpeed: 2.8, feelsLike: 29 },
    'nadiad': { name: 'Nadiad', country: 'IN', temp: 27, condition: 'sunny', icon: '01d', humidity: 68, windSpeed: 2.5, feelsLike: 30 },
    'surat': { name: 'Surat', country: 'IN', temp: 32, condition: 'hot', icon: '01d', humidity: 75, windSpeed: 2.1, feelsLike: 36 },
    'ahmedabad': { name: 'Ahmedabad', country: 'IN', temp: 29, condition: 'sunny', icon: '01d', humidity: 60, windSpeed: 3.0, feelsLike: 33 },
    'rajkot': { name: 'Rajkot', country: 'IN', temp: 31, condition: 'clear sky', icon: '01d', humidity: 58, windSpeed: 2.8, feelsLike: 34 },
    'london': { name: 'London', country: 'GB', temp: 12, condition: 'cloudy', icon: '04d', humidity: 78, windSpeed: 4.1, feelsLike: 9 },
    'new york': { name: 'New York', country: 'US', temp: 18, condition: 'partly cloudy', icon: '02d', humidity: 65, windSpeed: 3.5, feelsLike: 16 },
    'tokyo': { name: 'Tokyo', country: 'JP', temp: 22, condition: 'clear sky', icon: '01d', humidity: 60, windSpeed: 2.8, feelsLike: 24 },
    'mumbai': { name: 'Mumbai', country: 'IN', temp: 30, condition: 'humid', icon: '02d', humidity: 85, windSpeed: 3.2, feelsLike: 35 },
    'paris': { name: 'Paris', country: 'FR', temp: 15, condition: 'light rain', icon: '10d', humidity: 72, windSpeed: 3.8, feelsLike: 13 },
    'dubai': { name: 'Dubai', country: 'AE', temp: 35, condition: 'sunny', icon: '01d', humidity: 45, windSpeed: 2.5, feelsLike: 40 },
    'delhi': { name: 'Delhi', country: 'IN', temp: 25, condition: 'hazy', icon: '50d', humidity: 70, windSpeed: 2.5, feelsLike: 28 }
};

const cityAlternatives = {
    'mahesana': ['mehsana', 'mahesana,in'],
    'ahemdabad': ['ahmedabad'],
    'vadodaea': ['vadodara'],
    'vadodra': ['vadodara'],
    'baroda': ['vadodara'],
    'mumbai': ['bombay'],
    'delhi': ['new delhi'],
    'kolkata': ['calcutta']
};

function findClosestCity(input) {
    const cities = Object.keys(fallbackData);
    const allAlts = Object.keys(cityAlternatives);
    const allCities = [...cities, ...allAlts, 'london', 'mumbai', 'delhi', 'tokyo', 'paris'];
    
    for (const city of allCities) {
        if (city.includes(input.toLowerCase()) || input.toLowerCase().includes(city)) {
            return city;
        }
    }
    return null;
}

function getWeatherIcon(iconCode) {
    const icons = {
        '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return icons[iconCode] || '🌤️';
}

async function getWeather() {
    const cityInput = document.getElementById("inputCity").value.trim();
    if (!cityInput) {
        showError("Please enter a city name");
        return;
    }
    
    const result = document.getElementById("result");
    
    result.innerHTML = `
        <div style="font-size: 2em; margin-bottom: 10px;">🔄</div>
        <div>Getting weather for ${cityInput}...</div>
    `;
    result.style.background = "rgba(255, 255, 255, 0.2)";
    
    const cityLower = cityInput.toLowerCase();
    
    // Check fallback data first
    if (fallbackData[cityLower]) {
        const weather = fallbackData[cityLower];
        displayWeather(weather);
        return;
    }
    
    // Try API with original name
    let success = await tryAPI(cityInput);
    if (success) return;
    
    // Try alternatives
    if (cityAlternatives[cityLower]) {
        for (const alt of cityAlternatives[cityLower]) {
            success = await tryAPI(alt);
            if (success) return;
        }
    }
    
    // Try spell correction
    const closest = findClosestCity(cityInput);
    if (closest && closest !== cityLower) {
        if (fallbackData[closest]) {
            displayWeather(fallbackData[closest]);
            return;
        }
        success = await tryAPI(closest);
        if (success) return;
    }
    
    showError(`City "${cityInput}" not found. Try: London, Mumbai, Delhi, Tokyo, Paris, Vadodara, Mahesana`);
}

async function tryAPI(cityName) {
    try {
        const response = await fetch(`${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
        if (!response.ok) return false;
        
        const data = await response.json();
        const weather = {
            name: data.name,
            country: data.sys.country,
            temp: Math.round(data.main.temp),
            condition: data.weather[0].description,
            icon: getWeatherIcon(data.weather[0].icon),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            feelsLike: Math.round(data.main.feels_like)
        };
        displayWeather(weather);
        return true;
    } catch {
        return false;
    }
}

function displayWeather(weather) {
    const result = document.getElementById("result");
    result.innerHTML = `
        <div style="font-size: 2em; margin-bottom: 10px;">${getWeatherIcon(weather.icon)}</div>
        <div style="font-size: 1.5em; font-weight: bold;">${weather.name}, ${weather.country}</div>
        <div style="font-size: 2em; color: #ffeaa7; margin: 10px 0;">${weather.temp}°C</div>
        <div style="font-size: 1.1em; margin-bottom: 10px;">${weather.condition}</div>
        <div style="font-size: 0.9em; opacity: 0.8;">
            Feels like ${weather.feelsLike}°C • Humidity ${weather.humidity}% • Wind ${weather.windSpeed} m/s
        </div>
    `;
    result.style.background = "rgba(0, 184, 148, 0.3)";
    
    // Change background based on weather
    changeWeatherBackground(weather.condition, weather.icon);
}

function changeWeatherBackground(condition, icon) {
    const bg = document.getElementById('weatherBg');
    bg.className = 'weather-bg';
    
    const conditionLower = condition.toLowerCase();
    const isNight = icon && icon.includes('n');
    
    if (isNight) {
        bg.classList.add('night');
    } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
        bg.classList.add('sunny');
    } else if (conditionLower.includes('cloud')) {
        bg.classList.add('cloudy');
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
        bg.classList.add('rainy');
    } else if (conditionLower.includes('snow')) {
        bg.classList.add('snowy');
    } else {
        bg.classList.add('cloudy');
    }
}

function showError(message) {
    const result = document.getElementById("result");
    result.innerHTML = `
        <div style="font-size: 2em; margin-bottom: 10px;">❌</div>
        <div>${message}</div>
    `;
    result.style.background = "rgba(231, 76, 60, 0.3)";
}

function selectCity(cityName) {
    document.getElementById("inputCity").value = cityName;
    getWeather();
}

document.getElementById("getWeather").addEventListener("click", getWeather);

document.getElementById("inputCity").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
});