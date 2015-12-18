'use strict';

const db = require('./database');

const Joi = require('joi');

const validations = {};

validations.textMessage = Joi.object().keys({
    message: Joi.string().required(),
    conversation_id: Joi.string().required(),
    from: Joi.string().required()
});

validations.locationMessage = Joi.object().keys({
    location_id: Joi.string().required(),
    conversation_id: Joi.string().required(),
    from: Joi.string().required()
});

module.exports = validations;