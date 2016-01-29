'use strict';

const fns = {};

/**
 * checks if a magic command was used and invokes the actions (if any)
 * @param messageData
 * @returns {Promise}
 */
fns.getMessageObject = (messageData) => {
    return new Promise(resolve => {
        resolve(messageData);
    });
};

module.exports = fns;