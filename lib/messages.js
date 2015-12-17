'use strict';

const db = require('./database');

const fns = {};

fns.newTextMessage = (message, next) => {
    message.data.message_type = 'text';

    db.addNewMessage(message.data)
        .then(result => {
            console.log(result);
            next(null, message);
        })
        .catch(next);
};
fns.newLocationMessage = (message, next) => {
    message.data.message_type = 'location';

    db.addNewMessage(message.data)
        .then(result => {
            console.log(result);
            next(null, message);
        })
        .catch(next);
};

module.exports = fns;