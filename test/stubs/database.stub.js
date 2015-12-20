'use strict';

const fns = {};

fns.insertOne = (message, collection) => {
    if (message.participants && message.participants.length) {
        message._id = '5673ee68d3f839675dc860ec';
        return Promise.resolve(message);
    }
    return Promise.resolve({insertedId: '5673ee68d3f839675dc860ec'});
};


module.exports = fns;