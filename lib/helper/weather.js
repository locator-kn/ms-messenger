'use strict';

const Forecast = require('forecast');

// Initialize
const forecast = new Forecast({
    service: 'forecast.io',
    key: process.env['FORECAST_SECRET'],
    units: 'celcius', // Only the first letter is parsed
    cache: true,      // Cache API requests?
    ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
        minutes: 27,
        seconds: 45
    }
});

const fns = {};

const conditionIcons = {
    'clear-day': '☀️',
    'clear-night': '🌙',
    'cloudy': '☁️',
    'fog': '🌁',
    'partly-cloudy-day': '⛅️',
    'partly-cloudy-night': '🌙',
    'rain': '☔️',
    'sleet': '❄️ ☔️',
    'snow': '❄️',
    'wind': '🍃',
    'error': '❗️'
};

const buildWeatherString = weatherData => {
    let currentWeather = weatherData.currently;
    let temperature = currentWeather.temperature;
    let temperatureApparent = currentWeather.apparentTemperature;
    let tmpMgs = `Es hat derzeit ${temperature} C°, aber es fühlt sich an wie ${temperatureApparent} C° ${conditionIcons[currentWeather.icon]}\n`;
    let cloudCovageMgs = `Der Himmel ist zu ${currentWeather.cloudCover * 100}% mit Wolken bedeckt.\n`;
    let humidityMsg = `Die aktuelle Luftfeuchtigkeit beträgt ${currentWeather.humidity * 100}%.\n`;
    let windMsg = `Die Windgeschwindigkeit beträgt ${currentWeather.windSpeed * 1.60934} km/h\n`;
    return tmpMgs + cloudCovageMgs + humidityMsg + windMsg;
};

fns.getWeather = (messageData) => {
    return new Promise((resolve, reject) => {
        forecast.get([47.66868204997508, 9.169753789901733], (err, data) => {
            if (err) {
                console.log(err);
                return reject(err);
            }

            messageData.message = buildWeatherString(data);

            resolve(messageData);
        });
    });
};

fns.getWeather('ad', 'das');

module.exports = fns;