'use strict';

const db = require('./database');

const Joi = require('joi');

const validations = {};

validations.mongoId = Joi.string().optional();
validations.mongoIdRequired = Joi.string().required();

validations.basicMessage = Joi.object().keys({
    conversation_id: validations.mongoIdRequired,
    from: validations.mongoIdRequired,
    timestamp: Joi.number()
});

validations.textMessage = validations.basicMessage.keys({
    message: Joi.string().required()
});

validations.locationMessage = validations.basicMessage.keys({
    location_id: validations.mongoIdRequired
});

let participant = Joi.object().keys({
    user_id: validations.mongoIdRequired,
    last_read: Joi.number().optional().default(0)
});

validations.newConversation = Joi.object().keys({
    participants: Joi.array().items(participant).min(2)
});

validations.userId = Joi.object().keys({
    user_id: validations.mongoIdRequired
})

module.exports = validations;