'use strict';

const giphy = require('giphy-api')();

const fns = {};

const extractGiphyUrl = (giphyResponse) => {
    if(giphyResponse.data.length) {
        return giphyResponse.data.map(r => r.images.downsized_large.url);
    }
    return [giphyResponse.data.image_original_url];
};

const getGiphy = (messageText) => {
    let searchWord = messageText.split(' ')[1];
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
        .then(result => result[0] ? result[0] : 'a')
        .then(url => console.log(url));
};

fns.testForAction = (messageData) => {
    if (messageData.startsWith('/giphy')) {
        return getGiphy;
    }
    return null;
};

getGiphy('/giphy random');

module.exports = fns;