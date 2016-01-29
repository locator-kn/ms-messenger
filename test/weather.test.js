'use strict';
import test from 'ava';
const proxyquire =  require('proxyquire');

const forecastStub = require('./stubs/forecast.stub');

const weather = proxyquire('../lib/helper/weather', { 'forecast': forecastStub });


test('weather.getWeather', t => {
    weather.getWeather({}).then(data => {
        t.is(data.message, 'Es hat derzeit 3.55 C°, aber es fühlt sich an wie 1.36 C° 🌙\nDer Himmel ist zu 46% mit Wolken bedeckt.\nDie aktuelle Luftfeuchtigkeit beträgt 95%.\nDie Windgeschwindigkeit beträgt 3.7175754 km/h\n');
    });
});