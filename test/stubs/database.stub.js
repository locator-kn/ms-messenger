'use strict';

const fns = {};

fns.addNewMessage = (message) => {
    if (message.message_type !== 'location' && message.message_type !== 'text') {
        return Promise.reject({message: 'cmd was not test', code: 4000});
    }
    return Promise.resolve({_id: '5673ee68d3f839675dc860ec'});
};


module.exports = fns;