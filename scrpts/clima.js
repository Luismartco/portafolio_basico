navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude);
});

function getWeather(latitude, longitude) {
    const apiKey = '00ddf358e92558bd3e329ced58f54ebb';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.round(data.main.temp);
            const iconCode = data.weather[0].icon;
            const cityName = data.name;
            updateUI(temperature, iconCode, cityName);
        })
        .catch(error => console.error('Error al obtener el clima', error));
}

function updateUI(temperature, iconCode, cityName) {
    document.getElementById('temperature').innerText = `${temperature}°C`;
    document.getElementById('city').innerText = cityName;
    const weatherBox = document.getElementById('weather-box');

    // Cambiar el fondo del div según la hora del día
    if (iconCode.endsWith('d')) {
        if (iconCode === '10d' || iconCode === '50d') {
            weatherBox.className = 'sunrise'; // Amanecer
        } else {
            weatherBox.className = 'daytime'; // Día
        }
    } else {
        if (iconCode === '10n' || iconCode === '50n') {
            weatherBox.className = 'sunset'; // Anochecer
        } else {
            weatherBox.className = 'nighttime'; // Noche
        }
    }
}