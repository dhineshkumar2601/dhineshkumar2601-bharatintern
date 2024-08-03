document.getElementById('getWeather').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('output').innerText = "Geolocation is not supported by this browser.";
    }
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = '71f7a32b98a875a31fe08914b86f4a12';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('output').innerText = JSON.stringify(data, null, 2);
            } else {
                document.getElementById('output').innerText = `Error: ${data.message}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('output').innerText = 'Error fetching weather data: ' + error;
        });
}

function showError(error) {
    console.error('Geolocation error:', error);
    let message = "";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            message = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            message = "An unknown error occurred.";
            break;
    }
    document.getElementById('output').innerText = message;
}
