'use strict';

const giphy = require('giphy-api')();

const fns = {};

const extractGiphyUrl = (giphyResponse) => {
    if (giphyResponse.data.length) {
        return giphyResponse.data.map(r => r.images.downsized_large.url);
    }
    return [giphyResponse.data.image_original_url];
};

const getGiphy = (messageData, messageTextArray) => {
    let searchWord = messageTextArray[1];
    let giphyFn = giphy.random;
    let giphyOptions;

    if (searchWord) {
        giphyFn = giphy.search;
        giphyOptions = {
            q: searchWord,
            limit: 2
        };
    }
    return giphyFn.apply(giphy, [giphyOptions])
        .then(extractGiphyUrl)
        // TODO: what if no result available
        .then(result => result[0] ? result[0] : '')
        .then(urlString => {
            messageData.message = urlString;
            messageData.message_type = 'giphy';
            return messageData;
        });
};


const ACTIONS = {
    '/giphy': getGiphy
};


fns.testForAction = (messageData) => {
    if (messageData.startsWith('/giphy')) {
        return getGiphy;
    }
    return () => {
        return false;
    };
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