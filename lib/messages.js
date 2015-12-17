'use strict';

const db = require('./database');

const fns = {};

fns.newTextMessage = (message, next) => {
    message.data.message_type = 'text';

    db.addNewMessage(message.data)
        .then(dbResponse => {
            next(null, {
                _id: dbResponse.insertedId
            });
        })
        .catch(next);
};
fns.newLocationMessage = (message, next) => {
    message.data.message_type = 'location';

    db.addNewMessage(message.data)
        .then(dbResponse => {
            next(null, {
                _id: dbResponse.insertedId
            });
        })
        .catch(next);
};

module.exports = fns;