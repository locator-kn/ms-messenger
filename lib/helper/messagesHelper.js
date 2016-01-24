'use strict';

const giphy = require('./giphy');

const fns = {};

const ACTIONS = {
    '/giphy': giphy.getGiphy
};

/**
 * checks if a magic command was used and invokes the actions (if any)
 * @param messageData
 * @returns {Promise}
 */
fns.getMessageObject = (messageData) => {
    let msgArray = messageData.message.split(' ');
    return new Promise(resolve => {

        let fn = ACTIONS[msgArray[0]];
        if (fn) {
            return fn(messageData, msgArray).then(resolve);
        }
        resolve(messageData);
    });
};

module.exports = fns;