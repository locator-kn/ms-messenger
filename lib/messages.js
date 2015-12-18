'use strict';

const db = require('./database');
const Joi = require('joi');
const schema = require('./validation');

const fns = {};

fns.newTextMessage = (message, next) => {
    Joi.validate(message.data, schema.textMessage, (err, messageData) => {
        console.log(err || messageData);
        message.data.message_type = 'text';

        db.addNewMessage(message.data)
            .then(dbResponse => {
                next(null, {
                    _id: dbResponse.insertedId
                });
            })
            .catch(next);
    });
};
fns.newLocationMessage = (message, next) => {
    Joi.validate(message.data, schema.locationMessage, (err, messageData) => {
        message.data.message_type = 'location';

        db.addNewMessage(message.data)
            .then(dbResponse => {
                next(null, {
                    _id: dbResponse.insertedId
                });
            })
            .catch(next);
    });
};

module.exports = fns;