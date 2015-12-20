'use strict';

const db = require('./database');
const Joi = require('joi');
const schema = require('./validation');

const fns = {};

fns.newConversation = (message, next) => {
    Joi.validate(message.data, schema.newConversation, (err, messageData) => {

        if (err) {
            return next(err);
        }

        db.insertOne(messageData, 'conversations')
            .then(dbResponse => {
                next(null, messageData);
            })
            .catch(err => {
                next(err);
            });
    });
};

module.exports = fns;