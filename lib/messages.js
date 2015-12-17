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
fns.newVideoMessage = (message, next) => {
    message.data.message_type = 'video';

    db.addNewMessage(message.data)
        .then(result => {
            console.log(result);
            next(null, message);
        })
        .catch(next);
};

module.exports = fns;