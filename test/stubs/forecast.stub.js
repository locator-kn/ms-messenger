'use strict';
const dummyResponse = require('../fixture/weatherResponse.json');

const fns = {};

fns.get = (message, callback) => {
    if(message) {
        return callback(null, dummyResponse);
    }
};


module.exports = fns;