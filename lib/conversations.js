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
        db.countByIds(messageData.participants.map(user => user.user_id), 'users')
            .then(foundUsers => {
                if (messageData.participants.length !== foundUsers) {
                    throw Error('one or many users not found or loner alert, TODO: errmsg');
                }
            })
            .then(db.insertOne(messageData, 'conversations'))
            .then(() => next(null, {data: messageData}))
            .catch(next);
    });
};

fns.getConversationsByUserId = (message, next) => {
    Joi.validate(message.data, schema.userId, (err, data) => {

        if (err) {
            return next(err);
        }

        db.findConversationsByUser(data, 'conversations')
            .then(queryResult => next(null, {data: queryResult}))
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
                if (!queryResult) {
                    throw new Error('not found');
                }
                next(null, {data: queryResult});
            })
            .catch(next);
    });
};

fns.ackConversation = (message, next) => {

    Joi.validate(message.data, schema.conversationAck, (err, data) => {

        if (err) {
            return next(err);
        }

        db.acknowledgeConversation(data.conversation_id, data.user_id, data.last_read)
            .then(queryResult => {
                if (!queryResult.value) {
                    throw new Error('not found');
                }
                next(null, {data: queryResult.value});
            })
            .catch(next);
    });
};

module.exports = fns;