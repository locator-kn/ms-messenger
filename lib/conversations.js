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
            .then(() => {
                next(null, messageData);
            })
            .catch(next);
    });
};

fns.getConversationsByUserId = (message, next) => {
    Joi.validate(message.data, schema.userId, (err, data) => {

        if (err) {
            return next(err);
        }

        db.findConversationsByUser(data, 'conversations')
            .then(queryResult => {
                next(null, queryResult);
            })
            .catch(next);
    });
};

fns.getConversationById = (message, next) => {
    Joi.validate(message.data, schema.conversationId, (err, data) => {

        if (err) {
            return next(err);
        }

        db.findById(data.conversation_id, 'conversations')
            .then(queryResult => {
                if(!queryResult.length) {
                    let err = {msg: 'not_found'};
                    return next(null, err);
                }
                next(null, queryResult[0]);
            })
            .catch(next);
    });
};

module.exports = fns;