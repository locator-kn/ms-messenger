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

fns.getMessagesByConversationId = (message, next) => {
    console.time('validation');
    Joi.validate(message.data, schema.messagesByConversationId, (err, messageData) => {
        console.timeEnd('validation');
        if (err) {
            return next(err);
        }
        if (!messageData.query) {
            messageData.query = {};
            messageData.query.elements = 100;
            messageData.query.page = 0;
        }

        db.findMessagesByConversationId(messageData.conversation_id, messageData.query)
            .then(dbResponse => {
                next(null, dbResponse);
            })
            .catch(next);
    });
};

module.exports = fns;