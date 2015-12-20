'use strict';

const db = require('./database');

const Joi = require('joi');

const validations = {};

validations.basicMessage = Joi.object().keys({
    conversation_id: Joi.string().required(),
    from: Joi.string().required(),
    timestamp: Joi.number()
});

validations.textMessage = validations.basicMessage.keys({
    message: Joi.string().required()
});

validations.locationMessage = validations.basicMessage.keys({
    location_id: Joi.string().required()
});

let participant = Joi.object().keys({
    user_id: Joi.string().required(),
    last_read: Joi.number().optional().default(0)
});

validations.newConversation = Joi.object().keys({
    participants: Joi.array().items(participant).min(2)
});

module.exports = validations;