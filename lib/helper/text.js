'use strict';

const fns = {};


fns.getShruggie = (messageData, messageTextArray) => {
    messageData.message = '¯\_(ツ)_/¯';
    messageData.type = 'text';
    return Promise.resolve(messageData);
};

module.exports = fns;