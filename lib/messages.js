'use strict';

const db = require('./database');
const Joi = require('joi');
const schema = require('./validation');

const fns = {};

fns.newTextMessage = (message, next) => {
    Joi.validate(message.data, schema.textMessage, (err, messageData) => {
        if (err) {
            return next(err);
        }

        messageData.message_type = 'text';

        db.insertOne(messageData, 'messages')
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
        if (err) {
            return next(err);
        }
        messageData.message_type = 'location';

        db.insertOne(messageData, 'messages')
            .then(dbResponse => {
                next(null, {
                    _id: dbResponse.insertedId
                });
            })
            .catch(next);
    });
};

module.exports = fns;